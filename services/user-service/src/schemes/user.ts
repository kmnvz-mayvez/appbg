import Joi, { ObjectSchema } from 'joi';

const userSchema: ObjectSchema = Joi.object().keys({
    platNumber: Joi.string().optional().messages({
        'string.base': 'must be of type string',
        'string.empty': 'is required',
        'any.required': 'is required'
    }),
    hourStay: Joi.number().optional().greater(0).messages({
        'number.greater': 'Response time must be greater than zero'
    }),
    createdAt: Joi.string().optional()
});

export { userSchema };
