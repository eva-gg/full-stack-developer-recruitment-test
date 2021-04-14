import Time from "./Time";

describe("Time", () => {
  describe("add", () => {
    ([
      {
        initial: new Time(0, 0),
        duration: new Time(0, 30),
        expected: new Time(0, 30),
      },
      {
        initial: new Time(1, 45),
        duration: new Time(0, 30),
        expected: new Time(2, 15),
      },
      {
        initial: new Time(2, 0),
        duration: new Time(1, 0),
        expected: new Time(3, 0),
      },
      {
        initial: new Time(23, 30),
        duration: new Time(0, 30),
        expected: new Time(0, 0),
      },
    ] as Array<{
      initial: Time;
      duration: Time;
      expected: Time;
    }>).forEach(({ initial, duration, expected }) => {
      it(`should add time: initial=${initial.toString()} duration=${duration.toString()} expected=${expected.toString()}`, () => {
        const newTime = initial.add(duration);
        expect(newTime.hour).toBe(expected.hour);
        expect(newTime.minute).toBe(expected.minute);
      });
    });
  });

  describe("remove", () => {
    [
      {
        remove: new Time(0, 0),
        from: new Time(0, 30),
        expected: new Time(0, 30),
      },
      {
        remove: new Time(0, 45),
        from: new Time(1, 15),
        expected: new Time(0, 30),
      },
      {
        remove: new Time(23, 30),
        from: new Time(0, 0),
        expected: new Time(0, 30),
      },
    ].forEach(({ remove, from, expected }) => {
      it(`should remove time: initial=${from.toString()} duration=${remove.toString()} expected=${expected.toString()}`, () => {
        const result = from.remove(remove);
        expect(result.hour).toBe(expected.hour);
        expect(result.minute).toBe(expected.minute);
      });
    });
  });

  describe("difference", () => {
    [
      { from: new Time(0, 0), to: new Time(0, 30), expected: new Time(0, 30) },
      { from: new Time(0, 45), to: new Time(1, 15), expected: new Time(0, 30) },
      { from: new Time(23, 30), to: new Time(0, 0), expected: new Time(0, 30) },
    ].forEach(({ from, to, expected }) => {
      it(`should return difference: initial=${from.toString()} duration=${to.toString()} expected=${expected.toString()}`, () => {
        const result = from.difference(to);
        expect(result.hour).toBe(expected.hour);
        expect(result.minute).toBe(expected.minute);
      });
    });
  });

  describe("toString", () => {
    it(`should returns time formated`, () => {
      expect(new Time(0, 0).toString()).toBe("00:00");
    });
  });
});
