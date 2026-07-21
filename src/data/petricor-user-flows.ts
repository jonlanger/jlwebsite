import type { ProjectUserFlowTab } from "@/data/past-projects";

function asset(filename: string) {
  return `/projects/petricor/${filename}`;
}

export const PETRICOR_USER_FLOW_TABS: readonly ProjectUserFlowTab[] = [
  {
    value: "lab-tech-app",
    label: "Lab Tech App",
    description:
      "The lab technician app workflow starts with logging in and selecting tasks — Sample Preparation, Incubation, Imaging, Analysis, or Reporting — from the main dashboard. Reporting lets users select data, generate customized reports, and export or send them as needed. After any task, the user returns to the home screen to pick another task or log out. The design emphasizes clear steps and minimal complexity to support accuracy and throughput in the lab.",
    images: [
      {
        src: asset("petricor_ui_inspiration.png"),
        alt: "Petricor UI inspiration board for the lab technician web app.",
        width: 2024,
        height: 1457,
      },
      {
        src: asset("petricor_app_ux_lab_tech.png"),
        alt: "Petricor high-level app UX flow for lab technicians.",
        width: 2448,
        height: 1146,
      },
    ],
  },
  {
    value: "on-device",
    label: "On-Device",
    description:
      "The on-device workflow begins with powering on the unit, initializing it, and selecting tasks from the home screen — loading petri dishes, capturing images, barcoding samples, and sending data to the app. Barcoding attaches labels to dishes with verification before data transfer. Technicians can return to the home screen for additional tasks or power off when finished.",
    images: [
      {
        src: asset("petricor_id_inspiration.png"),
        alt: "Petricor industrial design inspiration for the analysis device.",
        width: 1949,
        height: 1404,
      },
      {
        src: asset("petricor_on_device_ux_lab_tech.png"),
        alt: "Petricor high-level on-device UX flow for lab technicians.",
        width: 2646,
        height: 1632,
      },
    ],
  },
];
