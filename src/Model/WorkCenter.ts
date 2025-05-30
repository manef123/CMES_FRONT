import { WorkCenterType } from "./WorkCenterType";

export interface WorkCenter {
    id:number;
    workCenterNumber: string;
    workCenterType: WorkCenterType;
    description: string;
    plant: string;
    costCenter: string;
    capacity : number;
    capacityUnit: string;
    isActive  : Boolean;
  }
  