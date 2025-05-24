import { Material } from "./Material";
import { ProductionVersionStatus } from "./ProductionVersionStatus";
import { Bom } from "./Bom";
import { Routing } from './Routing';


export interface ProductVersion {
  id: number;
   versionCode: string;
 // productVersionNumber: string;
  productionVersionStatus: ProductionVersionStatus;
  //validityStartDate: Date;
  //validityEndDate: Date;
  description: string;

  //material: Material;
  bom: Bom;
  routing: Routing;
}

  