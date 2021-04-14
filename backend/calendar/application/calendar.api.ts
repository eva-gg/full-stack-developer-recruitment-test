import LocationRepository from "../infrastructure/location.repository";
import moment from "moment";
import Slot from "../domain/Slot";
import SlotRepository from "../infrastructure/slot.repository";
import { groupBy } from "lodash";
import { SlotModel } from "./models";

export default class CalendarApi {
  private readonly _locationRepository: LocationRepository;
  private readonly _slotRepository: SlotRepository;

  constructor(
    locationRepository: LocationRepository,
    slotRepository: SlotRepository
  ) {
    this._locationRepository = locationRepository;
    this._slotRepository = slotRepository;
  }

  getNextDaysSlots({
    from,
    days,
  }: {
    from: string;
    days: number;
  }): {
    [key: string]: SlotModel[];
  } {
    const fromDate = moment(from, "YYYY-MM-DD", true);

    if (!fromDate.isValid()) {
      throw new Error(
        'From date is not valid, expected format is "YYYY-MM-DD".'
      );
    }

    if (days != 10) {
      throw new Error("Days value must be 10 days, for now...");
    }

    // Consider there is only one location for now, we just get it
    const location = this._locationRepository.findLocation();

    const slots = this._slotRepository.listSlotsByLocation(
      location,
      fromDate,
      days
    );

    const slotModels = slots.map(
      (slot) =>
        ({
          id: slot.id,
          date: slot.date.format("YYYY-MM-DD"),
          endTime: slot.endTime.toString(),
          numberPlayersAvailable: slot.numberPlayersAvailable,
          startTime: slot.startTime.toString(),
          weekDay: slot.weekDay,
        } as SlotModel)
    );

    const result: {
      [key: string]: SlotModel[];
    } = {};

    for (let i = 0; i < days; i++) {
      const date = moment(from).add(i, "day");
      const dateStr = date.format("YYYY-MM-DD");

      result[dateStr] = slotModels.filter((slot) => slot.date === dateStr);
    }

    return result;
  }
}
