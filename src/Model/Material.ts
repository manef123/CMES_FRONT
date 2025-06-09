import { CharacteristicAssignment } from "./CharacteristicAssignment";
import { Classification } from "./Classification";
import { ControlModel } from "./ControlModel";
import { MaterialType } from './MaterialType';

export interface Material {
  id: number;
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
  classifications: Classification[];
   controlModels : ControlModel[];

  principalControlModelId: number;
  principalControlModel: ControlModel;

  characteristicAssignments : CharacteristicAssignment[];
}

export interface CreateMaterialDto extends Omit<Material, 'id' | 'classifications'> {}
export interface MaterialDto extends Material {}