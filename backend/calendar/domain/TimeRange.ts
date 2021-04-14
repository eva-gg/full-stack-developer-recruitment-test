import moment from "moment";
import { Duration } from "moment";
import Time from "./Time";

export default class TimeRange {
    readonly from: Time;
    readonly to: Time;

    constructor(from: Time, to: Time) {
        this.from = from;
        this.to = to;
    }

    get duration(): Duration {
        const duration = moment.duration()
        
        let minute = this.to.minute - this.from.minute;
        let minusHour = 0;
        if (this.from.minute > this.to.minute) {
            minute += 60;
            minusHour = 1;
        }

        let hour = this.to.hour - this.from.hour - minusHour;
        if (this.from.hour > this.to.hour) {
            hour += 24;
        }

        duration.add(hour, 'hour');
        duration.add(minute, 'minute');

        return duration;
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
