import LocationRepository from "../infrastructure/location.repository";
import SlotRepository from "../infrastructure/slot.repository";
import CalendarApi from "./calendar.api";

describe("Calendar api", () => {
  describe("getNextDaysSlots", () => {
    let api: CalendarApi;
    beforeEach(() => {
      api = new CalendarApi(new LocationRepository(), new SlotRepository());
    });

    it(`should throw if wrong date`, () => {
      expect(() => api.getNextDaysSlots({ from: "wrong", days: 10 })).toThrow(
        'From date is not valid, expected format is "YYYY-MM-DD".'
      );
    });

    it(`should throw if wrong days`, () => {
      expect(() =>
        api.getNextDaysSlots({ from: "2021-04-21", days: 1 })
      ).toThrow("Days value must be 10 days, for now...");
    });
  });
});
