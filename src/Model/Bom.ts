import { AlternativeBOM } from "./AlternativeBOM";
import { Material } from "./Material";
import { ProductionVersionStatus } from "./ProductionVersionStatus";
import { ProductVersion } from "./ProductVersion";
import { Routing } from "./Routing";

export interface BOM {
  bomNumber :string;
  materialNumber: string;
  alternativeBomNumber: string;
  bomStatus : ProductionVersionStatus;
  validityStartDate: Date;
  validityEndDate: Date;
  baseQuantity : string;
  unitOfMeasure : string;
  bomDescription :string;

  // Associations
  productVersion: ProductVersion;
  material: Material;
  routing: Routing;
  alternativeBOMs: AlternativeBOM[]; // Une BOM peut avoir plusieurs BOM alternatives
  
}
