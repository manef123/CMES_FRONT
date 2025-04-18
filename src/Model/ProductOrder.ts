import { ProductOrderStatus } from "./ProductOrderStatus";

export interface ProductOrder {
    orderNumber: string;
    materialNumber: string;
    productVersionNumber : string;
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
  }
  