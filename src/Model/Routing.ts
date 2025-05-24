import { ProductionVersionStatus } from "./ProductionVersionStatus";
import { ProductVersion } from "./ProductVersion";
import { WorkCenter } from "./WorkCenter";

export interface Routing {
    id : number;
    routingNumber: string;
    materialNumber: string;
    routingStatus: ProductionVersionStatus;
    validityStartDate: Date;
    validityEndDate: Date;
    baseQuantity: number;
    unitOfMeasure: string;
    description: string;
    
    workCenters?: WorkCenter[];
    workCenterIds?: number[];
    productVersion: ProductVersion;
  }
  