// Renders a showreel clip plan to H.264 MP4s with AVFoundation (no ffmpeg).
// usage: render <job.json>
// job: { framesDir, fps, frames:[{f,x,y,w,h}], outputs:[{path,width,height,bitrate}],
//        poster:{path,width}, thumbs:{dir,width,count} }
import AVFoundation
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct PlanFrame: Decodable { let f: String; let x: Int; let y: Int; let w: Int; let h: Int }
struct Output: Decodable { let path: String; let width: Int; let height: Int; let bitrate: Int }
struct Poster: Decodable { let path: String; let width: Int }
struct Thumbs: Decodable { let dir: String; let width: Int; let count: Int }
struct Job: Decodable {
  let framesDir: String; let fps: Int32; let frames: [PlanFrame]
  let outputs: [Output]; let poster: Poster?; let thumbs: Thumbs?
}

let job = try JSONDecoder().decode(Job.self, from: Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1])))
let cs = CGColorSpace(name: CGColorSpace.sRGB)!

final class Encoder {
  let writer: AVAssetWriter; let input: AVAssetWriterInput; let adaptor: AVAssetWriterInputPixelBufferAdaptor
  let w: Int; let h: Int
  init(_ o: Output, fps: Int32) throws {
    w = o.width; h = o.height
    let url = URL(fileURLWithPath: o.path)
    try? FileManager.default.removeItem(at: url)
    writer = try AVAssetWriter(outputURL: url, fileType: .mp4)
    writer.shouldOptimizeForNetworkUse = true
    input = AVAssetWriterInput(mediaType: .video, outputSettings: [
      AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: w, AVVideoHeightKey: h,
      AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: o.bitrate, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: Int(fps), AVVideoExpectedSourceFrameRateKey: fps,
      ],
      AVVideoColorPropertiesKey: [
        AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
        AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
        AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2,
      ],
    ])
    input.expectsMediaDataInRealTime = false
    adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
      kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
      kCVPixelBufferWidthKey as String: w, kCVPixelBufferHeightKey as String: h,
    ])
    writer.add(input)
    writer.startWriting()
    writer.startSession(atSourceTime: .zero)
  }
  func append(_ img: CGImage, _ i: Int64, _ fps: Int32) -> CGImage? {
    while !input.isReadyForMoreMediaData { usleep(1000) }
    var pb: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
    let buf = pb!
    CVPixelBufferLockBaseAddress(buf, [])
    let ctx = CGContext(
      data: CVPixelBufferGetBaseAddress(buf), width: w, height: h, bitsPerComponent: 8,
      bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: cs,
      bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
    ctx.interpolationQuality = .high
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
    let snapshot = ctx.makeImage()
    CVPixelBufferUnlockBaseAddress(buf, [])
    adaptor.append(buf, withPresentationTime: CMTime(value: i, timescale: fps))
    return snapshot
  }
  func finish() {
    input.markAsFinished()
    let sem = DispatchSemaphore(value: 0)
    writer.finishWriting { sem.signal() }
    sem.wait()
    if writer.status != .completed { fputs("render error: \(String(describing: writer.error))\n", stderr); exit(1) }
  }
}

func writeJPEG(_ img: CGImage, _ path: String, width: Int) {
  let h = Int(Double(img.height) * Double(width) / Double(img.width))
  let ctx = CGContext(data: nil, width: width, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: cs,
                      bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.interpolationQuality = .high
  ctx.draw(img, in: CGRect(x: 0, y: 0, width: width, height: h))
  let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: path) as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
  CGImageDestinationAddImage(dest, ctx.makeImage()!, [kCGImageDestinationLossyCompressionQuality: 0.8] as CFDictionary)
  CGImageDestinationFinalize(dest)
}

let encoders = try job.outputs.map { try Encoder($0, fps: job.fps) }
var lastFile = ""
var source: CGImage?
let n = job.frames.count
let thumbAt: Set<Int> = {
  guard let t = job.thumbs, t.count > 0 else { return [] }
  return Set((0..<t.count).map { min(n - 1, Int(Double($0) / Double(max(1, t.count - 1)) * Double(n - 1))) })
}()

for (i, fr) in job.frames.enumerated() {
  if fr.f != lastFile {
    let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: "\(job.framesDir)/\(fr.f)") as CFURL, nil)!
    source = CGImageSourceCreateImageAtIndex(src, 0, nil)
    lastFile = fr.f
  }
  // CGImage.cropping uses top-left pixel coordinates.
  guard let cropped = source!.cropping(to: CGRect(x: fr.x, y: fr.y, width: fr.w, height: fr.h)) else { continue }
  var first: CGImage?
  for e in encoders {
    let snap = e.append(cropped, Int64(i), job.fps)
    if first == nil { first = snap }
  }
  if i == 0, let p = job.poster, let img = first { writeJPEG(img, p.path, width: p.width) }
  if thumbAt.contains(i), let t = job.thumbs, let img = first {
    writeJPEG(img, "\(t.dir)/\(String(format: "%03d", i)).jpg", width: t.width)
  }
}
encoders.forEach { $0.finish() }
print("rendered \(n) frames")
