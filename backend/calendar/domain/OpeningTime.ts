import TimeRange from "./TimeRange";

export default class OpeningTime {
  readonly monday?: TimeRange[];
  readonly tuesday?: TimeRange[];
  readonly wednesday?: TimeRange[];
  readonly thursday?: TimeRange[];
  readonly friday?: TimeRange[];
  readonly saturday?: TimeRange[];
  readonly sunday?: TimeRange[];

  constructor(
    monday?: TimeRange[],
    tuesday?: TimeRange[],
    wednesday?: TimeRange[],
    thursday?: TimeRange[],
    friday?: TimeRange[],
    saturday?: TimeRange[],
    sunday?: TimeRange[]
  ) {
    this.monday = monday;
    this.tuesday = tuesday;
    this.wednesday = wednesday;
    this.thursday = thursday;
    this.friday = friday;
    this.saturday = saturday;
    this.sunday = sunday;
  }
}
