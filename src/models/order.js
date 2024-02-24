const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  adress: {
    type: String,
    required: true,
  },
  items: [
    {
      item : {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
      amount: {
        type: Number,
        required: true,
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
