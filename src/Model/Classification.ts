import { Characteristic } from './Characteristic';
import { ClassStatus } from './ClassStatus';
import { ClassType } from './ClassType';
import { MultilangDescription } from './Multilang-description' ;

export interface Classification {
  id : number;
  classNumber: string;
  classType: ClassType;
  className: string;
  classDescription: string;
  classStatus: ClassStatus;
  classGroup: string;
  classHierarchy: string;
  classUsage: string;
  classKeyDate: Date;
  validityStartDate: Date;
  validityEndDate: Date;
  isInherited: boolean;
  classAuthorizationGroup: string;
  materialNumber: any[];
 characteristics : Characteristic[];

}
