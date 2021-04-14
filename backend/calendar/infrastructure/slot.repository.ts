import moment from "moment";
import { Moment } from "moment";
import Location from "../domain/Location";
import Slot from "../domain/Slot";
import Time from "../domain/Time";
import { WeekDay, weekDays } from "../domain/WeekDay";

let id = 491;

export default class SlotRepository {
  listSlotsByLocation(location: Location, from: Moment, days: number): Slot[] {
    const result: Slot[] = [];

    const sessionDuration = location.sessionDuration;
    let numberPlayersAvailable = 0;
    location.terrains.forEach(
      (terrain) => (numberPlayersAvailable += terrain.players)
    );

    for (let i = 0; i < days; i++) {
      const currentDate = moment(from).add(i, "day");

      // Check the day's opening hours
      const weekDay = currentDate.format("dddd").toLowerCase() as WeekDay;
      const dayTimeRanges = location.openingTime[weekDay];
      // If no opening hours, we continue
      if (!dayTimeRanges) {
        continue;
      }

      dayTimeRanges.forEach((dayTimeRange) => {
        const timeRangesMap = dayTimeRange.split(sessionDuration);

        timeRangesMap.forEach((timeRanges, key) => {
          const currentDay = moment(currentDate).add(key, "d");
          const currentWeekDay = currentDay
            .format("dddd")
            .toLowerCase() as WeekDay;

          timeRanges.forEach((timeRange) => {
            result.push(
              new Slot(
                id++,
                currentDay,
                timeRange.from,
                timeRange.to,
                currentWeekDay,
                numberPlayersAvailable
              )
            );
          });
        });
      });
    }

    return result;
  }
}
