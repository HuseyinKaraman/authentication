const Joi = require("joi");

const OrderSchema = Joi.object({
  address: Joi.string().required(),
  items: Joi.required(),
});

module.exports=  OrderSchema;
