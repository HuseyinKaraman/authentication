import Joi from 'joi';

const OrderSchema = Joi.object({
  address: Joi.string().required(),
  items: Joi.required(),
});

export default OrderSchema;
