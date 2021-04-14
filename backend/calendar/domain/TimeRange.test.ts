import Time from "./Time";
import TimeRange from "./TimeRange";

describe("TimeRange", () => {
  describe("split", () => {
    [
      {
        name: "return two time ranges",
        initial: new TimeRange(new Time(0, 0), new Time(1, 0)),
        duration: new Time(0, 30),
        expected: {
          0: [
            new TimeRange(new Time(0, 0), new Time(0, 30)),
            new TimeRange(new Time(0, 30), new Time(1, 0)),
          ],
        },
      },
      {
        name: "return two time ranges",
        initial: new TimeRange(new Time(23, 30), new Time(0, 30)),
        duration: new Time(0, 30),
        expected: {
          0: [new TimeRange(new Time(23, 30), new Time(0, 0))],
          1: [new TimeRange(new Time(0, 0), new Time(0, 30))],
        },
      },
    ].forEach(({ initial, duration, expected, name }) => {
      it(`should ${name}`, () => {
        const result = initial.split(duration);
        expect(JSON.stringify(result.get(0))).toBe(JSON.stringify(expected[0]));
        if (result.get(1)) {
          expect(JSON.stringify(result.get(1))).toBe(
            JSON.stringify(expected[1])
          );
        }
      });
    });
  });
});
