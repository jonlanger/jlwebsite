import type { PastProject } from "@/data/past-projects";

const BOARD = { width: 1800, height: 1013 } as const;

export const project: PastProject = {
  slug: "roadway-mobile-ticket",
  category: "software",
  title: "Roadway Mobile Ticket Experience",
  description:
    "A map-first mobile experience that puts project location data, multimedia, and ticket creation in the hands of contractors, admins, and field teams on roadway projects.",
  image: "/projects/roadway-mobile-ticket/roadway-mobile-ticket_card.png",
  alt: "e-dot Explore map with station chainage markers along a project alignment.",
  width: 1280,
  height: 720,
  overview: {
    title: "Overview",
    paragraphs: [
      "HaulHub (e-dot) needed field users \u2014 contractors, admins, and project teams working roadway and DOT compliance projects \u2014 to find, document, and act on project locations from the field, not just from a desktop.",
      "As Lead Designer, I redesigned the Explore Tab for HaulHub\u2019s mobile app around a map-first experience: surfacing precise station and location data, opening more ticket-creation paths (HaulHub\u2019s primary per-ticket revenue driver), and expanding multimedia capture \u2014 built for one-handed, on-site mobile use.",
    ],
    role: "Lead Designer",
    scope:
      "Mobile app \u2014 Explore Tab: Map View, Project Drawer, Ticket Creation, Multimedia",
  },
  sections: [
    {
      title: "Context",
      paragraphs: [
        "HaulHub\u2019s users and stakeholders \u2014 contractors, site managers, admins \u2014 work on construction sites and active roadway projects. Being tied to a desk to file paperwork doesn\u2019t just slow work down; it adds real cost. Time a site manager spends walking back to an office or laptop to log a ticket is time billed at a site manager\u2019s rate, not spent managing the site.",
        "Average U.S. construction and site manager pay lands around $38\u2013$43/hr (roughly $80k\u2013$90k annualized). Tickets and forms that previously took hours to complete back at a desk can take under a minute for some form types when the person is standing at the location \u2014 mid-conversation on-site, with the map already open.",
      ],
      topicGroups: [
        {
          title: "Field friction",
          items: [
            {
              title: "Desktop-bound paperwork",
              body: "Logging tickets from an office pulls site managers off the job \u2014 and bills that time at a manager\u2019s rate.",
            },
            {
              title: "Coarse location context",
              body: "Without station and offset at the point of work, tickets lose the precision the corridor actually requires.",
            },
            {
              title: "Too few entry points",
              body: "Ticket creation is HaulHub\u2019s per-ticket revenue driver \u2014 but field users need paths that match how work happens on site.",
            },
          ],
        },
        {
          title: "What mobile unlocks",
          items: [
            {
              title: "Stand at the location",
              body: "Create the ticket where the work is \u2014 with closest station, offset, and station ID already resolved.",
            },
            {
              title: "Minutes instead of hours",
              body: "Some form types drop from hours of desk work to under a minute when the map and form open together on site.",
            },
            {
              title: "Photos with the ticket",
              body: "Multimedia stays attached to the location and the entry \u2014 not a separate album to reconcile later.",
            },
          ],
        },
      ],
    },
    {
      title: "Approach",
      paragraphs: [
        "The Explore Tab is built around a persistent map view with a station-marker system along each project\u2019s alignment \u2014 chainage markers (e.g. 1+00 through 8+00), start and end station labels, and tick marks along the route \u2014 paired with a project search bar.",
        "Tapping into a location surfaces a bottom-sheet drawer with the closest station to the user\u2019s current location, offset distance, and station ID, plus direct actions to start a ticket. The shell stays mobile-native: iOS status bar, Today / Online / Explore tabs, and a pull-up drawer pattern designed for one-handed field use.",
      ],
      topicGroups: [
        {
          title: "Explore building blocks",
          items: [
            {
              title: "Map View",
              body: "Full-bleed map with station and chainage markers along the project route and a persistent Search Projects bar.",
            },
            {
              title: "Project Drawer",
              body: "Closest station, offset, and station ID \u2014 with Item, Sample, Other, and Save as distinct ticket-creation entry points.",
            },
            {
              title: "Multimedia",
              body: "Images attached to locations and ticket creation for field photo documentation alongside each entry.",
            },
            {
              title: "Mobile-native shell",
              body: "Bottom tab navigation and a pull-up drawer \u2014 not a scaled-down desktop layout.",
            },
          ],
        },
      ],
    },
    {
      title: "Product",
      paragraphs: [
        "The product story moves from the Explore map into the project drawer, then into ticket forms that keep location on the same screen \u2014 so field users never leave the corridor context to file the work.",
      ],
      productShowcase: {
        slides: [
          {
            src: "/projects/roadway-mobile-ticket/product-map-explore.png",
            alt: "Three Explore map screens: chainage markers, city project markers, and Manhattan location search.",
            ...BOARD,
            title: "Map View",
            caption:
              "Full-bleed maps with station markers and Search Projects \u2014 precise location before a ticket opens.",
          },
          {
            src: "/projects/roadway-mobile-ticket/product-project-drawer.png",
            alt: "Three project drawer states with closest station, ticket actions, and field photo previews.",
            ...BOARD,
            title: "Project Drawer",
            caption:
              "Closest station, offset, and station ID \u2014 with Item, Sample, Other, and Save as direct ticket paths.",
          },
          {
            src: "/projects/roadway-mobile-ticket/product-ticket-entry.png",
            alt: "Set sample location on the map, associate a tapped location with a project, and closest-station actions.",
            ...BOARD,
            title: "Ticket entry",
            caption:
              "Drop a sample on the alignment, associate a tapped point with a project, or start from closest station.",
          },
          {
            src: "/projects/roadway-mobile-ticket/product-ticket-forms.png",
            alt: "Sample form with map confirm, confirmed location, and Item Form fields.",
            ...BOARD,
            title: "Ticket forms",
            caption:
              "Sample and Item forms keep location visible through submit \u2014 sized for thumb reach on site.",
          },
          {
            src: "/projects/roadway-mobile-ticket/product-multimedia.png",
            alt: "Completed forms list, submitted locations, and drawer with construction photo gallery.",
            ...BOARD,
            title: "Multimedia",
            caption:
              "Field photos and submitted forms stay under the same station context as the ticket actions.",
          },
        ],
        accordion: [
          {
            value: "ticket-creation",
            title: "Ticket creation",
            description:
              "Sample location → form → confirm, plus Item, Traffic Control, Meeting, and work-zone paths from the drawer.",
            defaultOpen: true,
            slides: [
              {
                src: "/projects/roadway-mobile-ticket/product-sample-flow.png",
                alt: "Set sample location, Sample form with map, and confirmed location state.",
                ...BOARD,
                title: "Sample flow",
                caption:
                  "Set location on the alignment, fill the Sample form, confirm \u2014 under a minute on site.",
              },
              {
                src: "/projects/roadway-mobile-ticket/product-item-traffic.png",
                alt: "Item Form, Traffic Control header fields, and Traffic Control checklist.",
                ...BOARD,
                title: "Item & Traffic Control",
                caption:
                  "Item tickets and daily Traffic Control checklists \u2014 structured field paperwork, not desk work.",
              },
              {
                src: "/projects/roadway-mobile-ticket/product-other-forms.png",
                alt: "Meeting form, Work Zone Incident form, and Associate with Project drawer.",
                ...BOARD,
                title: "Other content",
                caption:
                  "Meeting notes, work-zone incidents, and associating a tapped location with a project.",
              },
            ],
          },
          {
            value: "search-field-docs",
            title: "Search & field documentation",
            description:
              "Find projects by place, review what was submitted at a station, and keep chainage context in view.",
            slides: [
              {
                src: "/projects/roadway-mobile-ticket/product-search.png",
                alt: "Manhattan location search with route results and project search states.",
                ...BOARD,
                title: "Search",
                caption:
                  "Filter the map by place or project name \u2014 dozens of markers and a results drawer.",
              },
              {
                src: "/projects/roadway-mobile-ticket/product-docs-on-map.png",
                alt: "Station drawer, completed forms with images, and media gallery on the project sheet.",
                ...BOARD,
                title: "Docs on the map",
                caption:
                  "Submitted forms and images live with closest-station context \u2014 a trail of what was logged here.",
              },
              {
                src: "/projects/roadway-mobile-ticket/product-station-context.png",
                alt: "Chainage map, closest-station drawer, and compact station stats sheet.",
                ...BOARD,
                title: "Station context",
                caption:
                  "Chainage, closest station, and offset stay visible while the field user acts.",
              },
            ],
          },
        ],
      },
    },
    {
      title: "Outcome",
      paragraphs: [
        "Increased access to location and mapping data, more ticket-creation entry points, expanded multimedia capture, and broader mobile capability led to more tickets and more usage \u2014 across contractors, admins, and projects on roadways in almost all 50 U.S. states.",
      ],
      stats: [
        {
          value: "In-field",
          label: "Location & mapping",
          detail:
            "Precise station and location data replacing coarser desktop-only context.",
        },
        {
          value: "More paths",
          label: "Ticket creation",
          detail:
            "More entry points into HaulHub\u2019s core per-ticket revenue flow.",
        },
        {
          value: "On-ticket",
          label: "Multimedia",
          detail:
            "Expanded photo and media capture tied to locations and tickets.",
        },
        {
          value: "~50 states",
          label: "Nationwide reach",
          detail:
            "Adoption by contractors, admins, and projects across almost all U.S. states.",
        },
      ],
    },
  ],
};
