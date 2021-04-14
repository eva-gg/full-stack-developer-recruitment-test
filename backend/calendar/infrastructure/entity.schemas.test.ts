import { ajv, terrainSchema } from "./entity.schemas";

describe("Entity Schemas", () => {
  describe("Time format", () => {
    ["00:00", "24:60"].forEach((el: string) => {
      it(`should be valid time "${el}"`, () => {
        expect(
          ajv.validate({ type: "string", format: "time" }, el)
        ).toBeTruthy();
      });
    });

    ["WRONG"].forEach((el: string) => {
      it(`should not be valid time "${el}"`, () => {
        expect(
          ajv.validate({ type: "string", format: "time" }, el)
        ).toBeFalsy();
      });
    });
  });

  describe("Terrain", () => {
    [{ players: 1 }, { players: 10 }].forEach((el) => {
      it(`should be valid players with: "${JSON.stringify(el)}"`, () => {
        expect(
          ajv.validate(terrainSchema, { name: "Name", players: el.players })
        ).toBeTruthy();
      });
    });

    [{ players: -1 }].forEach((el) => {
      it(`should not be valid players with: "${JSON.stringify(el)}"`, () => {
        expect(
          ajv.validate(terrainSchema, { name: "Name", players: el.players })
        ).toBeFalsy();
      });
    });
  });
});
