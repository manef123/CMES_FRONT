import { Event } from './Event';
import { Characteristic } from './Characteristic';

export class CharacteristicValue {
  id!: number;
  recordedValue!: string;
  eventDate!: Date;

  eventId?: number;
  event?: Event;

  characteristicId!: number;
  characteristic?: Characteristic;
}
