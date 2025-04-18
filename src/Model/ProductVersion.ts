import { Material } from "./Material";
import { ProductionVersionStatus } from "./ProductionVersionStatus";
import { ProductOrderStatus } from "./ProductOrderStatus";

export interface ProductVersion {
    productVersionNumber: string;
    materialNumber: string;
    bomNumber: string;
    routingNumber: string;
    productionVersionStatus : ProductionVersionStatus;
    validityStartDate: Date;
    validityEndDate : Date;
    description: string;

    material: Material; 
  }
  