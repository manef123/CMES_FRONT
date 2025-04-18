import { Classification } from "./Classification";
import { MaterialType } from "./MaterialType";

export interface Material {
    materialNumber: string;
    materialType: MaterialType;
    description : string;
    baseUnitOfMeasure: string;
    materialGroup: string;
    division: string;
    batchManagement: boolean;
    serialNumberManagement : Boolean;
    taxClassification : string;
    industrySector : string ;
    oldMaterialNumber : string;
    materialHierarchy : string;
    materialStatus : string;
    procurementType: string;
    MRPType:string;
    MRPController : string;
    lotSize :string;
    purchasingGroup : string;
    purchasingValueKey : string ;
    accountAssignmentGroup : string;
    valuationClass: string;
    standardPrice: number;
    movingAveragePrice : number;
    taxData : string;
    classificationData: string;


  //  classification: Classification;

  }
  