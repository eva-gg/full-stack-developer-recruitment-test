const Joi = require('joi')

export const TerrainSchema = Joi.object({
    name: Joi.string().required(),
    players: Joi.number().required(),
})