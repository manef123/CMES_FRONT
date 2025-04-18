import { BOM } from "./Bom";


export interface AlternativeBOM {
  alternativeBOMNumber: string;
  bomNumber: string;
  materialNumber: string;
  description: string;
  validityStartDate: Date;
  validityEndDate: Date;

  bom: BOM;
}
