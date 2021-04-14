import moment from "moment";
import { Moment } from "moment";
import Location from "../domain/Location";
import Slot from "../domain/Slot";
import Time from "../domain/Time";
import { WeekDay } from "../domain/WeekDay";

let id = 491;

export default class SlotRepository {
  listLocationSlotsByDate(location: Location, date: Moment): Slot[] {
    const result: Slot[] = [];

    const sessionDuration = location.sessionDuration;
    let numberPlayersAvailable = 0;
    location.terrains.forEach(
      (terrain) => (numberPlayersAvailable += terrain.players)
    );

    const currentDay = moment(date);
    // Check the day's opening hours
    const weekDay = currentDay.format("dddd").toLowerCase() as WeekDay;
    const timeRanges = location.openingTime[weekDay];
    // If no opening hours, we continue
    if (!timeRanges) {
      return result;
    }

    timeRanges.forEach((dayTimeRange) => {
      const duration = dayTimeRange.duration;
      const tmpDate = moment(currentDay);
      tmpDate.set("hour", dayTimeRange.from.hour);
      tmpDate.set("minute", dayTimeRange.from.minute);

      while (duration.asMinutes() >= sessionDuration.asMinutes()) {
        const slotDate = moment(tmpDate);
        // Get the start time
        const startTime = new Time(tmpDate.get("hour"), tmpDate.get("minute"));
        // Add the session duration to the temporary date
        tmpDate.add(sessionDuration);
        // Get the end time
        const endTime = new Time(tmpDate.get("hour"), tmpDate.get("minute"));

        duration.subtract(sessionDuration);

        result.push(
          new Slot(id++, slotDate, startTime, endTime, numberPlayersAvailable)
        );
      }
    });

    return result;
  }

  listSlotsByLocation(location: Location, from: Moment, days: number): Slot[] {
    const result: Slot[] = [];

    for (let i = 0; i < days; i++) {
      const currentDate = moment(from).add(i, "day");

      result.push(...this.listLocationSlotsByDate(location, currentDate));
    }

    return result;
  }
}
