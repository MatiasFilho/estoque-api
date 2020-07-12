const Joi = require('joi');

module.exports = {
  body: {
    active: Joi.boolean().default(false),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    activeCode: Joi.string(),
    password: Joi.string().required().min(6),
  }
};
