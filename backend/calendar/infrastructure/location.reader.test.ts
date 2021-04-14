import fs from "fs";
import OpeningTime from "../domain/OpeningTime";
import TimeRange from "../domain/TimeRange";
import Terrain from "../domain/Terrain";
import Time from "../domain/Time";
import { LocationSchema } from "./entity.models";
import { toDuration, toLocation, toTime } from "./location.reader";

describe("Location reader", () => {
  describe("toTime", () => {
    [
      { data: "00:00", expectedHour: 0, expectedMinute: 0 },
      { data: "23:00", expectedHour: 23, expectedMinute: 0 },
    ].forEach(({ expectedHour, expectedMinute, data }) => {
      it(`should be valid time: ${data}`, () => {
        const time = toTime(data);
        expect(time.hour).toEqual(expectedHour);
        expect(time.minute).toEqual(expectedMinute);
      });
    });

    ["aa:aa", null].forEach((data) => {
      it(`should throw if not be valid time: ${data}`, () => {
        expect(() => toTime(data as string)).toThrow();
      });
    });
  });

  describe("toDuration", () => {
    [
      { hour: 1, minute: 30, expectedHour: 1, expectedMinute: 30 },
    ].forEach(({ expectedHour, expectedMinute, hour, minute }) => {
      it(`should be valid duration: ${hour}:${minute}`, () => {
        const duration = toDuration(hour, minute);
        expect(duration.get('h')).toEqual(expectedHour);
        expect(duration.get('m')).toEqual(expectedMinute);
      });
    });
  });

  describe("toLocation", () => {
    it(`should be a valid location`, () => {
      const locationJson: LocationSchema = {
        opening_time: {
          monday: [
            {
              from: "14:00",
              to: "23:30",
            },
          ],
          wednesday: [
            {
              from: "10:00",
              to: "12:00",
            },
            {
              from: "14:00",
              to: "00:00",
            },
          ],
        },
        terrains: [
          {
            name: "A",
            players: 12,
          },
          {
            name: "B",
            players: 6,
          },
        ],
        session_duration: "00:30",
      };

      const location = toLocation(locationJson);
      // Opening time
      expect(location.openingTime).toBeInstanceOf(OpeningTime);
      expect(location.openingTime.monday).toBeInstanceOf(Array);
      expect(
        location.openingTime.monday && location.openingTime.monday[0]
      ).toBeInstanceOf(TimeRange);
      expect(location.openingTime.tuesday).toBeUndefined();
      expect(location.openingTime.wednesday).toBeInstanceOf(Array);
      expect(
        location.openingTime.wednesday && location.openingTime.wednesday[0]
      ).toBeInstanceOf(TimeRange);
      // Fields
      expect(location.terrains.length).toEqual(locationJson.terrains.length);
      location.terrains.forEach((terrain) =>
        expect(terrain).toBeInstanceOf(Terrain)
      );
      // Session duration
      expect(location.sessionDuration.get('h')).toBe(0);
      expect(location.sessionDuration.get('m')).toBe(30);
    });
  });
});
