import { Material } from './Material';
import { Characteristic } from './Characteristic';

export class CharacteristicAssignment {
  id!: number;

  valueRange!: string;
  defaultValue!: string;
  unitOfMeasure!: string;
  isRequired!: boolean;

  materialId!: number;
  material!: Material;

  characteristicId!: number;
  characteristic!: Characteristic;
}
