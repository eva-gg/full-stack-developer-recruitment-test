const Joi = require('joi')
    .extend(require('@joi/date'));

export const FromToSchema = Joi.object({
    from: Joi.date().format("HH:mm").required(),
    to: Joi.date().format("HH:mm").required(),
})