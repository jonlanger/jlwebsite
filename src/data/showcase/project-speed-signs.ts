import type { PastProject } from "@/data/past-projects";

export const project: PastProject = {
  slug: "project-speed-signs",
  category: "software",
  title: "Project Speed & Signs",
  description:
    "Roadway safety data made mappable — documenting speed reductions, signs, and work-zone hazards so navigation systems can warn drivers in real time.",
  image: "/projects/project-speed-signs/project-speed-signs_card.png",
  alt: "Project Speed and Signs map with speed limit markers, work-zone signs, and stationing along a NYC corridor.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "Construction and DOT project sites lack a consistent, structured way to document speed reductions, signage, and hazards along a roadway corridor. Without that data, the systems people actually rely on to navigate \u2014 Google Maps, Apple Maps, Waze, Garmin \u2014 have no way to know a work zone is there. Drivers approach construction sites, crews, and pedestrians at speeds set for open road, not an active job site.",
      "I designed the Project Speed & Signs workflow for HaulHub \u2014 a system for documenting the exact placement of speed reductions, signs, and notifications along a project\u2019s route, so that data can in turn feed into third-party mapping and navigation systems.",
    ],
    role: "Lead Designer",
    scope:
      "Web platform \u2014 project stationing settings, speed zones, sign placement, map layer visibility",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "Work zones exist on paper, in field notes, and in the minds of the people who set them up \u2014 not in the maps that guide drivers there. Speed reductions and temporary signs are often recorded inconsistently across crews and agencies, so there\u2019s nothing structured enough for a navigation provider to ingest.",
        "HaulHub already held the project corridor through Stationing. The opportunity was to make speed and sign data sit on that same route \u2014 verified coordinates, discrete placements, and a live map that matches what a driver would actually encounter on site.",
      ],
      topicGroups: [
        {
          title: "What\u2019s missing today",
          items: [
            {
              title: "No structured work-zone data",
              body: "Speed reductions, signs, and hazards along a corridor aren\u2019t captured in a consistent format navigation systems can use.",
            },
            {
              title: "Maps stay blind to the job site",
              body: "Google Maps, Apple Maps, Waze, and Garmin can\u2019t warn drivers about a work zone they have no data for.",
            },
            {
              title: "Open-road speeds into active sites",
              body: "Drivers, crews, and pedestrians meet at speeds set for clear roadway \u2014 not for construction.",
            },
          ],
        },
        {
          title: "What structured data unlocks",
          items: [
            {
              title: "Mappable speed zones",
              body: "Start and end points along a route become segments with a posted reduction \u2014 the same shape navigation APIs expect.",
            },
            {
              title: "Discrete sign positions",
              body: "Each sign or notification drops at a verified coordinate, not a vague mile marker in a spreadsheet.",
            },
            {
              title: "A feed for mapping partners",
              body: "Documented zones and signs become shareable safety data \u2014 for contractors, municipalities, and mapping providers.",
            },
          ],
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The workflow lives inside a project\u2019s Stationing settings, alongside route creation \u2014 so speed and sign documentation isn\u2019t a separate tool, it\u2019s part of defining the corridor itself.",
        "Users lay out the route with start and end stations, then add speed reductions (start and end along the route) or signs and notifications (a single discrete position). A live map surfaces the active speed limit for the selected segment and renders sign placement in context, with independent visibility toggles for Stationing and Signs.",
      ],
      topicGroups: [
        {
          title: "Workflow shape",
          items: [
            {
              title: "Define the route",
              body: "Lay out the project corridor by setting start and end stations, each capturing verified coordinates.",
            },
            {
              title: "Add speed, signs, or notifications",
              body: "Speed reductions get a start and end along the route. Signs and notifications drop at a single position.",
            },
            {
              title: "See it on the map",
              body: "The map shows the active speed limit for the selected segment and places signs where a driver would encounter them.",
            },
            {
              title: "Control what\u2019s visible",
              body: "Independent Stationing and Signs toggles let users isolate the layer they\u2019re working on without losing the rest of the picture.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story starts with the empty Speed and Signs shell on the project map, then moves through adding speed zones and signs along stationing \u2014 ending with a corridor that shows posted limits and work-zone markers in place.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/project-speed-signs/product-overview.png",
            alt: "Project Speed and Signs empty state with map layer toggles for Stationing and Signs.",
            width: 1518,
            height: 1066,
            title: "Speed & Signs shell",
            caption:
              "Inside Project Settings, beside Stationing \u2014 add a speed reduction, sign, or notification, with Stationing and Signs layer toggles on the map.",
          },
          {
            src: "/projects/project-speed-signs/product-add-speed.png",
            alt: "Add menu open with Speed Reduction highlighted over routes with stationing labels on the map.",
            width: 1518,
            height: 1066,
            title: "Add a speed reduction",
            caption:
              "From the Speeds and Signs panel, add a Speed Reduction or Sign onto an existing route or alignment.",
          },
          {
            src: "/projects/project-speed-signs/product-speed-start.png",
            alt: "Input Speed Details panel with selected start location pin on the map.",
            width: 1518,
            height: 1066,
            title: "Set the zone start",
            caption:
              "Pick a start on the map or by address \u2014 posted speed on the segment is shown so the reduction is grounded in what\u2019s already there.",
          },
          {
            src: "/projects/project-speed-signs/product-saved-speeds.png",
            alt: "Map with SPEED LIMIT 25 signs and a road work ahead marker along stationing routes.",
            width: 1518,
            height: 1066,
            title: "Saved on the corridor",
            caption:
              "Speed limits and work-zone signs render on the route \u2014 structured, mappable data that matches what a driver would see on site.",
          },
          {
            src: "/projects/project-speed-signs/product-saved-sign-zoom.png",
            alt: "Zoomed-out NYC map with saved sign markers along multiple routes.",
            width: 1518,
            height: 1066,
            title: "Corridor at a glance",
            caption:
              "Zoom out and the documented signs stay anchored to the corridor \u2014 ready to share with mapping partners.",
          },
        ],
        accordion: [
          {
            value: "speed-zones",
            title: "Speed reduction workflow",
            description:
              "Select start and end along the route, set the reduced limit against the posted speed, and confirm the zone on the map.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/project-speed-signs/product-speed-details.png",
                alt: "Input Speed Details with posted speed limit graphics and speed reduction dropdown open.",
                width: 1518,
                height: 1066,
                title: "Input speed details",
                caption:
                  "Posted limit on the segment sits next to the reduction you\u2019re setting \u2014 so the change is explicit, not buried in a form.",
              },
              {
                src: "/projects/project-speed-signs/product-speed-end.png",
                alt: "Selecting the end of a speed zone on the map with Input Speed Details panel.",
                width: 1518,
                height: 1066,
                title: "Set the zone end",
                caption:
                  "A speed reduction is a segment: start and end along the route, not a single pin that leaves the length ambiguous.",
              },
              {
                src: "/projects/project-speed-signs/product-custom-speed.png",
                alt: "Custom speed location input alongside the project map.",
                width: 1518,
                height: 1066,
                title: "Custom location",
                caption:
                  "Drop a custom speed location when the zone doesn\u2019t fall neatly on an existing station node.",
              },
              {
                src: "/projects/project-speed-signs/product-segment-hover.png",
                alt: "Zoomed-in map hovering a segment with Speeds and Signs panel showing segment cards.",
                width: 1518,
                height: 1066,
                title: "Segment context",
                caption:
                  "Hover a segment to see length, distance, and posted MPH \u2014 then add a sign or speed from the same card.",
              },
            ],
          },
          {
            value: "signs-visibility",
            title: "Signs & map visibility",
            description:
              "Choose sign type, drop a discrete position, and toggle Stationing vs Signs layers while editing.",
            slides: [
              {
                src: "/projects/project-speed-signs/product-add-sign.png",
                alt: "Add menu with Sign option over the Speeds and Signs route list.",
                width: 1518,
                height: 1066,
                title: "Add a sign",
                caption:
                  "Same Add menu as speed reductions \u2014 signs take a single discrete position instead of a start/end pair.",
              },
              {
                src: "/projects/project-speed-signs/product-sign-type.png",
                alt: "Input Sign Details with Sign Type dropdown showing Road Work Ahead and End Road Work.",
                width: 1518,
                height: 1066,
                title: "Choose sign type",
                caption:
                  "Road Work Ahead, End Road Work, and related types \u2014 the label that will appear for mapping partners and on the map.",
              },
              {
                src: "/projects/project-speed-signs/product-sign-location.png",
                alt: "Selecting a sign location on the map with Input Sign Details panel.",
                width: 1518,
                height: 1066,
                title: "Place on the map",
                caption:
                  "Pick the exact position along the corridor so the documented sign matches field placement.",
              },
              {
                src: "/projects/project-speed-signs/product-sign-dropped.png",
                alt: "Road Construction Ahead sign dropped on the map with verified sign details panel.",
                width: 1518,
                height: 1066,
                title: "Sign confirmed",
                caption:
                  "Type and address verified \u2014 add another sign or save the placement to the route.",
              },
              {
                src: "/projects/project-speed-signs/product-saved-sign.png",
                alt: "Saved sign on the map with Speeds and Signs route list.",
                width: 1518,
                height: 1066,
                title: "Saved sign",
                caption:
                  "The sign stays on the corridor with the routes and alignments that own it.",
              },
              {
                src: "/projects/project-speed-signs/product-visibility-on.png",
                alt: "Map layer toggles for Stationing and Signs both turned on.",
                width: 1518,
                height: 1066,
                title: "Layer visibility",
                caption:
                  "Independent Stationing and Signs toggles \u2014 isolate the layer you\u2019re editing without losing the rest of the picture.",
              },
              {
                src: "/projects/project-speed-signs/product-visibility-hide.png",
                alt: "Hiding specific routes and alignments on the Speeds and Signs map.",
                width: 1518,
                height: 1066,
                title: "Hide routes",
                caption:
                  "Per-route eye toggles declutter the map when multiple alignments share the same corridor.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Every documented speed zone and sign becomes structured, mappable data \u2014 the same kind of input navigation providers use to route drivers around hazards in real time. That opened new data-sharing partnerships across contractors, municipalities, and mapping providers, and a subscription-based data tier for those mapping partners.",
      ],
      stats: [
        {
          value: "Partners",
          label: "Data-sharing expansions",
          detail:
            "Increased partnerships across contractors, municipalities, and mapping providers.",
        },
        {
          value: "New tier",
          label: "Mapping-provider revenue",
          detail:
            "Subscription-based data tier for navigation and mapping partners.",
        },
        {
          value: "Mappable",
          label: "Work-zone safety data",
          detail:
            "Speed zones and signs structured for real-time navigation feeds.",
        },
      ],
    },
  ],
};
