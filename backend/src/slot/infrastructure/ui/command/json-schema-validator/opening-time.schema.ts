import {FromToSchema} from "./from-to.schema";

const Joi = require('joi')

export const OpeningTimeSchema = Joi.object({
    monday: Joi.array().items(FromToSchema).optional(),
    tuesday: Joi.array().items(FromToSchema).optional(),
    wednesday: Joi.array().items(FromToSchema).optional(),
    thursday: Joi.array().items(FromToSchema).optional(),
    friday: Joi.array().items(FromToSchema).optional(),
    saturday: Joi.array().items(FromToSchema).optional(),
    sunday: Joi.array().items(FromToSchema).optional(),
})