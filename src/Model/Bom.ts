import { Material } from './Material';
import { ProductVersion } from './ProductVersion';
import { Routing } from './Routing';

export interface Bom {
  id: number;
  bomNumber: string;
  alternativeBomNumber?: string;
  bomStatus: string;
  validityStartDate: Date;
  validityEndDate: Date;
  baseQuantity: string;
  unitOfMeasure: string;
  bomDescription: string;
  principalMaterialId: number;
  principalMaterial?: Material;
  productVersion: ProductVersion[];
  materials: Material[];
  routing: Routing;
  alternativeBOMs?: Bom[];
}
