import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/petricor/${filename}`;
}

export const PETRICOR_IMPLEMENT_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "hardware",
    label: "Hardware & On-Device",
    description:
      "The Petricor fungi analysis system is compact, ergonomic, and built for the laboratory — an enclosed chamber with a transparent door for six flat petri dishes, a touchscreen, integrated barcode printer, and side scanner for sample traceability. On-device workflows cover sample and image collection, barcode printing and scanning, and chamber monitoring and control.",
    images: [
      {
        src: asset("petricor_hardware_design.png"),
        alt: "Petricor hardware design and on-device UI overview.",
        width: 2342,
        height: 1533,
      },
      {
        src: asset("petricor_ready_state.png"),
        alt: "Petricor device ready state with chamber closed.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_printing_barcodes.png"),
        alt: "Petricor on-device UI: printing barcodes for petri dishes.",
        width: 2310,
        height: 1485,
      },
      {
        src: asset("petricor_scan_petri_barcodes.png"),
        alt: "Petricor on-device UI: scanning petri dish barcodes.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_printer_open.png"),
        alt: "Petricor on-device UI: printer open for label loading.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_side_barcode_scanner.png"),
        alt: "Petricor on-device UI: side barcode scanner in use.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_initial_petri_scan.png"),
        alt: "Petricor on-device UI: initial petri dish scan.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_incubation_period.png"),
        alt: "Petricor on-device UI: incubation period monitoring.",
        width: 2450,
        height: 1575,
      },
    ],
  },
  {
    value: "cloud",
    label: "Petricor Cloud",
    description:
      "Petricor Cloud is a cloud-based platform for fungal research and diagnostics — data analysis, storage, and collaboration. Advanced imaging and analytical tools support precise species identification, real-time processing, and automated reporting so researchers spend less time on manual analysis and more on discovery.",
    images: [
      {
        src: asset("petricor_cloud_dashboard_home.png"),
        alt: "Petricor Cloud dashboard home.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_create_experiment.png"),
        alt: "Petricor Cloud: create an experiment flow.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_device_overview.png"),
        alt: "Petricor Cloud: connected device overview.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_chamber_analysis.png"),
        alt: "Petricor Cloud: chamber analysis view.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_petri_dish_details.png"),
        alt: "Petricor Cloud: petri dish detail view.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_sample_log.png"),
        alt: "Petricor Cloud: sample log.",
        width: 2555,
        height: 1575,
      },
      {
        src: asset("petricor_sample_history.png"),
        alt: "Petricor Cloud: sample history.",
        width: 2450,
        height: 1575,
      },
      {
        src: asset("petricor_sample_analysis.png"),
        alt: "Petricor Cloud: sample analysis results.",
        width: 2450,
        height: 1575,
      },
    ],
  },
];
