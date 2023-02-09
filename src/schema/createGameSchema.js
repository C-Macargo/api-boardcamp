import joi from 'joi'

export const createGameSchema = joi.object ({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().required(),
    pricePerDay: joi.number().required(),
})