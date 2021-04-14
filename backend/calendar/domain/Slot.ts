import { Moment } from "moment";
import Terrain from "./Terrain";
import Time from "./Time";
import { WeekDay } from "./WeekDay";

export default class Slot {
  readonly id: number;
  readonly date: Moment;
  readonly startTime: Time;
  readonly endTime: Time;
  readonly weekDay: WeekDay;
  readonly numberPlayersAvailable: number;

  constructor(
    id: number,
    date: Moment,
    startTime: Time,
    endTime: Time,
    weekDay: WeekDay,
    numberPlayersAvailable: number
  ) {
    this.id = id;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.weekDay = weekDay;
    this.numberPlayersAvailable = numberPlayersAvailable;
  }
}
