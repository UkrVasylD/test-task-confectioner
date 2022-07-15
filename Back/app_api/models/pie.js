const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pieScheme = new Schema({
  category: {
    type: String,
 minlength:3,
 maxlength:25,
 required:true,
   } ,
  title:{
   type: String,
minlength:3,
maxlength:25,
required:true,
  } ,
  price:{
    type: Number,
   required:true,
   min:1,
   max:100000,
   },
  photo: {
    type: String,
 minlength:3,
 maxlength:125,
   } ,
  type: {
    type: String,
 minlength:3,
 maxlength:25,
   } ,
  description: {
    type: String,
 minlength:3,
 maxlength:2000,
   } ,
  
});
const PieModel = mongoose.model("Pie", pieScheme);

module.exports = PieModel;
