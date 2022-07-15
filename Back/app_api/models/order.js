const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderScheme = new Schema({
  time: Date,
  totalPrice: {
   type: Number,
  required:true,
  min:1,
  max:100000,
  },
  orderProductIdArr: [String],
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Users',
  // },
});
const OrderModel = mongoose.model("Order", orderScheme);

module.exports = OrderModel;
