import Time from "./Time";

describe("Time", () => {
  describe("toString", () => {
    it(`should returns time formated`, () => {
      expect(new Time(0, 0).toString()).toBe("00:00");
    });
  });
});
