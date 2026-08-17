import type { PastProject } from "@/data/past-projects";
import { project as careshift } from "@/data/showcase/careshift";
import { project as additiveMfgRoi } from "@/data/showcase/additive-mfg-roi";
import { project as cellGeneTherapy } from "@/data/showcase/cell-gene-therapy";
import { project as chemicalCx } from "@/data/showcase/chemical-cx";
import { project as additiveMfgCxData } from "@/data/showcase/additive-mfg-cx-data";
import { project as dialysisManagement } from "@/data/showcase/dialysis-management";
import { project as connectPoolRobot } from "@/data/showcase/connect-pool-robot";
import { project as additiveMfgPrintSimScan } from "@/data/showcase/additive-mfg-print-sim-scan";
import { project as consultantsPortal } from "@/data/showcase/consultants-portal";
import { project as projectSpeedSigns } from "@/data/showcase/project-speed-signs";
import { project as roadwayMobileTicket } from "@/data/showcase/roadway-mobile-ticket";
import { project as appliedAiMarketplace } from "@/data/showcase/applied-ai-marketplace";
import { project as proposalpal } from "@/data/showcase/proposalpal";
import { project as climateSync } from "@/data/showcase/climate-sync";
import { project as productbench } from "@/data/showcase/productbench";

/** Showcase order matches the September 2024 portfolio page. */
export const PORTFOLIO_SHOWCASE_PROJECTS: PastProject[] = [
  careshift,
  productbench,
  climateSync,
  proposalpal,
  appliedAiMarketplace,
  roadwayMobileTicket,
  projectSpeedSigns,
  consultantsPortal,
  additiveMfgRoi,
  cellGeneTherapy,
  chemicalCx,
  additiveMfgCxData,
  dialysisManagement,
  connectPoolRobot,
  additiveMfgPrintSimScan,
];
