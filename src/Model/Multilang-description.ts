import { Language } from './language';

export type MultilangDescription = {
  [key in Language]?: string;
};
