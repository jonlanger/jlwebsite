export type CocoJourneyMapColumns = readonly {
  header: string;
  rows: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}[];

export const COCO_CUSTOMER_JOURNEY_COLUMNS: CocoJourneyMapColumns = [
  {
    header: "Problem Discovery",
    rows: [
      "Notices overflowing bins",
      "Encounters issues with waste management",
      "Frustrated with inconsistent pick-up schedules",
      "Concerned about environmental impact",
      "Experiences frequent missed collections",
      "Sees local news about waste management problems",
    ],
  },
  {
    header: "Solution Search",
    rows: [
      "Searches for local recycling services online",
      "Reads reviews and ratings of different services",
      "Asks friends or community for recommendations",
      "Visits service websites and social media pages",
      "Downloads apps for potential services",
      "Attends local events or webinars on waste solutions",
    ],
  },
  {
    header: "Identification",
    rows: [
      "Compares various service providers",
      "Checks pricing and plan details",
      "Looks at available features (e.g., sensor bins)",
      "Evaluates environmental benefits and certifications",
      "Reads FAQs and customer support info",
      "Contacts customer support for clarifications",
    ],
  },
  {
    header: "Request",
    rows: [
      "Registers on the chosen service's app",
      "Selects a pick-up date and frequency",
      "Enters address and payment information",
      "Chooses additional services (e.g., bulky item pick-up)",
      "Reviews and confirms the request details",
      "Receives an order confirmation and receipt",
    ],
  },
  {
    header: "Pick Up",
    rows: [
      "Receives a notification for scheduled pick-up time",
      "Prepares bins according to service guidelines",
      "Places bins at designated spot on pick-up day",
      "Takes note of any special instructions or requirements",
      "Confirms bins are properly sorted (recycling vs. trash)",
      "Monitors pick-up process via app notifications",
    ],
  },
  {
    header: "Tracking",
    rows: [
      "Opens the app to track the pick-up status",
      "Gets real-time updates on the pick-up crew's location",
      "Receives confirmation of pick-up completion",
      "Reviews pick-up history in the app",
      "Gets notified of any issues or delays",
      "Receives reminders for next pick-up schedule",
    ],
  },
];

export const COCO_FLEET_MANAGER_JOURNEY_COLUMNS: CocoJourneyMapColumns = [
  {
    header: "Onboarding",
    rows: [
      "Completes company orientation and leadership training",
      "Familiarizes with fleet management software and tools",
      "Learns compliance and regulatory requirements",
      "Attends training on vehicle maintenance and safety",
      "Meets with drivers and assistants to discuss expectations",
      "Completes training on customer service and satisfaction",
    ],
  },
  {
    header: "Schedule and Route Understanding",
    rows: [
      "Reviews overall service area and routes",
      "Understands customer-specific requirements",
      "Plans optimal routes based on traffic patterns",
      "Reviews historical data on route performance",
      "Participates in route planning meetings",
      "Updates routes based on customer feedback",
    ],
  },
  {
    header: "Customer Item Pick Up Route Management and Safety",
    rows: [
      "Develops and enforces safety protocols for drivers",
      "Coordinates with dispatch for real-time route updates",
      "Ensures compliance with waste disposal regulations",
      "Conducts regular safety briefings and trainings",
      "Implements corrective actions for safety violations",
      "Ensures availability of safety equipment and PPE",
    ],
  },
  {
    header: "Performance and Cost Monitoring",
    rows: [
      "Monitors fuel consumption and maintenance costs",
      "Reviews driver performance and productivity",
      "Compares actual vs. budgeted expenses",
      "Analyzes cost-benefit of route adjustments",
      "Tracks overtime and labor costs",
      "Reviews cost implications of new service requests",
    ],
  },
  {
    header: "Efficiency Tracking",
    rows: [
      "Analyzes route efficiency metrics from the app",
      "Tracks on-time pick-up rates and completion times",
      "Identifies bottlenecks and delays in routes",
      "Monitors app-generated alerts for route deviations",
      "Evaluates fuel efficiency per vehicle",
      "Uses data to improve route planning and scheduling",
    ],
  },
  {
    header: "Reporting",
    rows: [
      "Prepares weekly and monthly performance reports",
      "Reports on fleet performance to upper management",
      "Submits maintenance and repair reports",
      "Provides feedback on app and route optimization",
      "Shares best practices and insights with team",
      "Compiles data for compliance and regulatory reporting",
    ],
  },
];

export const COCO_DRIVER_JOURNEY_COLUMNS: CocoJourneyMapColumns = [
  {
    header: "Onboarding",
    rows: [
      "Completes training modules on company policies",
      "Attends safety and compliance workshops",
      "Learns to use the company app and tech tools",
      "Reviews vehicle operation and maintenance procedures",
      "Meets with route managers to discuss expectations",
      "Completes certification for handling hazardous materials",
    ],
  },
  {
    header: "Pick Up Route Understanding",
    rows: [
      "Reviews assigned pick-up routes in the app",
      "Familiarizes with route maps and schedules",
      "Identifies high-traffic areas and time constraints",
      "Understands customer-specific instructions",
      "Participates in route dry runs or simulations",
      "Receives tips on time management and efficiency",
    ],
  },
  {
    header: "Pick Up Route Management",
    rows: [
      "Checks daily route assignments on the app",
      "Communicates with dispatch for updates or issues",
      "Uses GPS for navigation and real-time traffic updates",
      "Updates status of each pick-up in real-time",
      "Adapts to route changes due to roadworks or events",
      "Communicates with team members for coordination",
    ],
  },
  {
    header: "Unloading",
    rows: [
      "Drives to the designated unloading facility",
      "Follows safety protocols for unloading",
      "Sorts recyclables and trash at the facility",
      "Ensures proper disposal according to regulations",
      "Cleans truck for the next route",
      "Reports to supervisor after unloading is completed",
    ],
  },
  {
    header: "Efficiency Tracking",
    rows: [
      "Monitors fuel usage via app tracking",
      "Tracks time spent on each pick-up",
      "Reviews route efficiency metrics provided by the app",
      "Compares actual vs. planned route timings",
      "Records instances of delays or issues in the app",
      "Analyzes app-generated reports on route performance",
    ],
  },
  {
    header: "Reporting",
    rows: [
      "Logs completed pick-up data in the app",
      "Reports any missed collections or issues",
      "Submits end-of-day summary report",
      "Documents vehicle maintenance needs",
      "Shares feedback on route challenges",
      "Attends debriefing sessions to discuss route efficiency",
    ],
  },
];

export const COCO_COLLECTOR_JOURNEY_COLUMNS: CocoJourneyMapColumns = [
  {
    header: "Onboarding",
    rows: [
      "Completes company orientation and safety training",
      "Learns proper handling of recyclables and trash",
      "Familiarizes with vehicle and equipment operation",
      "Completes app usage training for real-time updates",
      "Meets with team members to understand role expectations",
      "Receives training on emergency procedures",
    ],
  },
  {
    header: "Items to Pick Up on Route Understanding",
    rows: [
      "Reviews item pick-up lists on the app",
      "Identifies special pick-up instructions for items",
      "Understands different types of waste and recyclables",
      "Recognizes hazardous materials and their handling",
      "Learns customer-specific requirements",
      "Participates in mock pick-up runs",
    ],
  },
  {
    header: "Item Pick Up Route Management and Safety",
    rows: [
      "Communicates with driver about route specifics",
      "Ensures proper lifting techniques are used",
      "Follows traffic rules and safety guidelines",
      "Uses personal protective equipment (PPE)",
      "Maintains communication with dispatch",
      "Manages time effectively to stay on schedule",
    ],
  },
  {
    header: "Unloading Assistance",
    rows: [
      "Assists with sorting items at the unloading site",
      "Follows safety protocols during unloading",
      "Helps clean the truck after unloading",
      "Ensures proper disposal of hazardous materials",
      "Checks for leftover items before leaving the site",
      "Assists in preparing the truck for the next route",
    ],
  },
  {
    header: "Efficiency Tracking",
    rows: [
      "Monitors time spent at each pick-up location",
      "Records any delays or issues encountered",
      "Reviews performance metrics provided by the app",
      "Compares actual vs. expected completion times",
      "Tracks fuel usage and reports inefficiencies",
      "Analyzes app-generated reports on task efficiency",
    ],
  },
  {
    header: "Reporting",
    rows: [
      "Logs details of each pick-up in the app",
      "Reports any damage or issues with collected items",
      "Submits daily activity reports",
      "Attends debriefing sessions for feedback and updates",
      "Provides suggestions for route or process improvements",
      "Shares observations on route and safety challenges",
    ],
  },
];
