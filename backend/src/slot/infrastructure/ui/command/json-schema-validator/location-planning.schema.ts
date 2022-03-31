import {OpeningTimeSchema} from "./opening-time.schema";
import {TerrainSchema} from "./terrain.schema";

const Joi = require('joi')
    .extend(require('@joi/date'));


export const LocationPlanningSchema = Joi.object({
    opening_time: OpeningTimeSchema.required(),
    terrains: Joi.array().items(TerrainSchema).required(),
    session_duration: Joi.date().format("HH:mm").required()
})