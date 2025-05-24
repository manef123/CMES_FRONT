import { Material } from "./Material";
import { ProductOrderStatus } from "./ProductOrderStatus";
import { ProductVersion } from "./ProductVersion";

export interface ProductOrder {
    id : number;
    orderNumber: string;
    materialNumber: string;
    productionVersionCode : string;
    orderStatus : ProductOrderStatus;
    orderDate : Date;
    startDate : Date;
    endDate : Date;
    plannedQuantity: number;
    unitOfMeasure: string;
    workCenterNumber: string;
    routingNumber: string;
    bomNumber : string;
    actualQuantity : number;
    orderDescription : string;

    material: Material;
    MaterialId:number;
  productionVersion: ProductVersion;
  ProductionVersionId:number;
  }
  