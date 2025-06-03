import { EventType } from './enums';
import { ControlModel } from './ControlModel';
import { Characteristic } from './Characteristic';

export class Event {
  id!: number;

  name!: string;
  eventType!: EventType;
  eventDate!: Date;

  controlModelId!: number;
  controlModel!: ControlModel;

  characteristics: Characteristic[] = [];
}
