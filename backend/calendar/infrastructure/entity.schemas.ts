import Ajv, { JSONSchemaType } from "ajv";
import {
  OpeningTimeRangeSchema,
  OpeningTimeSchema,
  LocationSchema,
  TerrainSchema,
} from "./entity.models";

export const ajv = new Ajv();
ajv.addFormat("time", /^[\d]{2}:[\d]{2}$/);

export const openingTimeRangeSchema: JSONSchemaType<OpeningTimeRangeSchema> = {
  type: "object",
  properties: {
    from: { type: "string", format: "time" },
    to: { type: "string", format: "time" },
  },
  required: ["from", "to"],
  additionalProperties: false,
};

export const locationOpeningTimeSchema: JSONSchemaType<OpeningTimeSchema> = {
  type: "object",
  properties: {
    monday: { type: "array", items: openingTimeRangeSchema, nullable: true },
    tuesday: { type: "array", items: openingTimeRangeSchema, nullable: true },
    wednesday: { type: "array", items: openingTimeRangeSchema, nullable: true },
    thursday: { type: "array", items: openingTimeRangeSchema, nullable: true },
    friday: { type: "array", items: openingTimeRangeSchema, nullable: true },
    saturday: { type: "array", items: openingTimeRangeSchema, nullable: true },
    sunday: { type: "array", items: openingTimeRangeSchema, nullable: true },
  },
  required: [],
  additionalProperties: false,
};

export const terrainSchema: JSONSchemaType<TerrainSchema> = {
  type: "object",
  properties: {
    name: { type: "string" },
    players: { type: "number", minimum: 1 },
  },
  required: ["name", "players"],
  additionalProperties: false,
};

export const locationSchema: JSONSchemaType<LocationSchema> = {
  type: "object",
  properties: {
    opening_time: locationOpeningTimeSchema,
    terrains: { type: "array", items: terrainSchema, minItems: 0 },
    session_duration: { type: "string", format: "time" },
  },
  required: ["opening_time", "terrains", "session_duration"],
  additionalProperties: false,
};
