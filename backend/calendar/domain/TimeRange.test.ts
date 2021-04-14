import Time from "./Time";
import TimeRange from "./TimeRange";

describe("TimeRange", () => {
  describe("duration", () => {
    [
      {
        range: new TimeRange(new Time(0, 0), new Time(1, 0)),
        expectedHour: 1,
        expectedMinute: 0,
      },
      {
        range: new TimeRange(new Time(23, 0), new Time(0, 30)),
        expectedHour: 1,
        expectedMinute: 30,
      },
    ].forEach(({ range, expectedHour, expectedMinute }) => {
      it(`should return ${expectedHour}:${expectedMinute}`, () => {
        const duration = range.duration;
        expect(duration.get("hour")).toEqual(expectedHour);
        expect(duration.get("minute")).toEqual(expectedMinute);
      });
    });
  });
});
