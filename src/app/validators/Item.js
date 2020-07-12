const Joi = require('joi');

module.exports = {
  body: {
    _user: Joi.string(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string(),
    qty: Joi.number().required(),
  }
};
