import Time from "./Time";

export default class TimeRange {
  readonly from: Time;
  readonly to: Time;

  constructor(from: Time, to: Time) {
    this.from = from;
    this.to = to;
  }

  split(duration: Time): Map<number, TimeRange[]> {
    const result = new Map<number, TimeRange[]>();

    let difference = this.to.remove(this.from);
    let from = this.from;
    let to = from.add(duration);
    let day = 0;

    while (difference.isGreaterOrEqualThan(duration)) {
      const timeRange = new TimeRange(from, to);
      result.set(day, [...(result.get(day) || []), timeRange]);

      if (from.isGreaterOrEqualThan(to)) {
        day += 1;
      }
      difference = difference.remove(duration);
      from = from.add(duration);
      to = from.add(duration);
    }

    return result;
  }
}
