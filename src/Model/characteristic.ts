import { DataType } from "./DataType";

export interface Characteristic {
    characteristicNumber: string;
    characteristicName: string;
    dataType: DataType;
    characteristic_description: string;
    defaultValue: string;
    unit_of_measure: string;
    isRequired: boolean;
    isSingleValue: boolean;
    characteristic_group: string;
    ValidityStartDate: Date; 
    ValidityEndDate: Date; 
  }
  