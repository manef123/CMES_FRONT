import { DataType } from "./DataType";

export interface Characteristic {
    id: number;
    characteristicNumber: string;
    characteristicName: string;
    dataType: DataType;
    characteristicDescription: string;
    valueRange: string;
    defaultValue: string;
    unitOfMeasure: string;
    isRequired: boolean;
    isSingleValue: boolean;
    CharacteristicGroup: string;
    ValidityStartDate: Date; 
    ValidityEndDate: Date; 
  }
  