import { Characteristic } from './characteristic';
import { ClassStatus } from './ClassStatus';
import { ClassType } from './ClassType';
import { MultilangDescription } from './Multilang-description' ;

export interface Classification {
  classNumber: string;
  classType: ClassType;
  className: string;
  classDescription: MultilangDescription;
  classStatus: ClassStatus;
  classGroup: string;
  classHierarchy: string;
  classUsage: string;
  classKeyDate: Date;
  validityStartDate: Date;
  validityEndDate: Date;
  isInherited: boolean;
  classAuthorizationGroup: string;
  materialNumber: string;
  characteristicNumber: string;
  characteristicValue: string;
  enteredByUser: string;
  entryDate: Date;

}
