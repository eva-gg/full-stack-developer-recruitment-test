import {
  OpeningTimeSchema,
  LocationSchema,
  TerrainSchema,
  OpeningTimeRangeSchema,
} from "./entity.models";
import Location from "../domain/Location";
import Time from "../domain/Time";
import OpeningTime from "../domain/OpeningTime";
import Terrain from "../domain/Terrain";
import TimeRange from "../domain/TimeRange";
import { ajv, locationSchema } from "./entity.schemas";

export function toTime(time: string): Time {
  const timeRegex = /^([\d]{2}):([\d]{2})$/;
  const result = time.match(timeRegex);

  if (!result || !result[0] || !result[1]) {
    throw new Error("Unexpected format for a time value.");
  }

  return new Time(parseInt(result[1]), parseInt(result[2]));
}

export function toOpeningTimeRange(
  openingTimeRange: OpeningTimeRangeSchema
): TimeRange {
  return new TimeRange(
    toTime(openingTimeRange.from),
    toTime(openingTimeRange.to)
  );
}

export function toOpeningTime(openingTime: OpeningTimeSchema): OpeningTime {
  return new OpeningTime(
    openingTime.monday?.map(toOpeningTimeRange),
    openingTime.tuesday?.map(toOpeningTimeRange),
    openingTime.wednesday?.map(toOpeningTimeRange),
    openingTime.thursday?.map(toOpeningTimeRange),
    openingTime.friday?.map(toOpeningTimeRange),
    openingTime.saturday?.map(toOpeningTimeRange),
    openingTime.sunday?.map(toOpeningTimeRange)
  );
}

export function toTerrain(terrain: TerrainSchema): Terrain {
  return new Terrain(terrain.name, terrain.players);
}

export function toLocation(locationSchema: LocationSchema): Location {
  return new Location(
    toOpeningTime(locationSchema.opening_time),
    locationSchema.terrains.map(toTerrain),
    toTime(locationSchema.session_duration)
  );
}

export function processLocationJsonData(rawData: string): Location {
  // TODO: Catch json parsing error
  const obj = JSON.parse(rawData);

  const result = ajv.validate(locationSchema, obj);
  if (result === false) {
    throw new Error("Wrong location json schema.");
  }

  return toLocation(obj as LocationSchema);
}
