import { StatesModel } from './states.model';

export interface DataModel {
  id: number,
  state: StatesModel | string,
  timeStamp?: number
}
