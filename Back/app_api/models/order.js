const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderScheme = new Schema({
  totalPrice: {
    type: Number,
    required: true,
    min: 1,
    max: 100000,
  },
  orderProductIdArr: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Pie",
      },
      count: { type: String },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});
const OrderModel = mongoose.model("Order", orderScheme);

module.exports = OrderModel;
