export default class Time {
  readonly hour: number;
  readonly minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  add(time: Time) {
    const minutes = this.minute + time.minute;
    const plusHour = minutes / 60;

    return new Time(
      (this.hour + time.hour + Math.floor(plusHour)) % 24,
      minutes % 60
    );
  }

  remove(time: Time) {
    let minute = this.minute - time.minute;
    let minusHour = 0;
    if (time.minute > this.minute) {
      minute += 60;
      minusHour = 1;
    }
    let hour = this.hour - time.hour - minusHour;
    if (time.hour > this.hour) {
      hour += 24;
    }

    return new Time(hour, minute);
  }

  difference(to: Time) {
    let minute = to.minute - this.minute;
    let minusHour = 0;
    if (this.minute > to.minute) {
      minute += 60;
      minusHour = 1;
    }
    let hour = to.hour - this.hour - minusHour;
    if (this.hour > to.hour) {
      hour += 24;
    }

    return new Time(hour, minute);
  }

  isGreaterOrEqualThan(time: Time) {
    if (this.hour > time.hour) return true;
    else if (this.hour === time.hour && this.minute >= time.minute) return true;
    return false;
  }

  toString() {
    return `${this.hour.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${this.minute.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  }
}
