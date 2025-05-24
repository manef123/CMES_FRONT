import { Classification } from "./Classification";
import { MaterialType } from './MaterialType';

export interface Material {
  id?: number;
  materialNumber: string;
  materialType: MaterialType;
  description: string;
  baseUnitOfMeasure: string;
  materialGroup: string;
  division: string;
  batchManagement: boolean;
  serialNumberManagement: boolean;
  taxClassification: string;
  industrySector: string;
  oldMaterialNumber: string;
  materialHierarchy: string;
  materialStatus: string;
  procurementType: string;
  mrpType: string;
  mrpController: string;
  lotSize: string;
  purchasingGroup: string;
  purchasingValueKey: string;
  accountAssignmentGroup: string;
  valuationClass: string;
  standardPrice: number;
  movingAveragePrice: number;
  taxData: string;
  classificationData: string;
  classifications?: Classification[];
}

export interface CreateMaterialDto extends Omit<Material, 'id' | 'classifications'> {}
export interface MaterialDto extends Material {}