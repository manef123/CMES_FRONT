import { ProductionVersionStatus } from "./ProductionVersionStatus";
import { ProductVersion } from "./ProductVersion";

export interface Routing {
    routingNumber: string;
    materialNumber: string;
    routingStatus: ProductionVersionStatus;
    validityStartDate: Date;
    validityEndDate: Date;
    baseQuantity: number;
    unitOfMeasure: string;
    routingDescription: string;
    
   
    productVersion: ProductVersion;
  }
  