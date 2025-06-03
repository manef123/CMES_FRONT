import { ControlModelType } from './enums';
import { Material } from './Material';
import { Characteristic } from './Characteristic';
import { Event } from './Event';

export class ControlModel {
  id!: number;
  modelType!: ControlModelType;
  description!: string;
  isPrincipal!: boolean;

  materials!: Material[];
  characteristics!: Characteristic[];
  events!: Event[];
}
