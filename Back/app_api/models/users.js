const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: {
    type: String,
    minlength: 3,
    maxlength: 320,
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: [true,'min 3 simbol'],
    lowercase: true,
    trim: true,
  },
  type: {
    type: String,
    minlength: 3,
    maxlength: 25,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  favoriteList: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Pie",
      },
      // default: [],
    },
  ],
  hash: {
    type: String,
    minlength: 3,
    maxlength: 1245,
    required: true,
  },
  salt: {
    type: String,
    minlength: 3,
    maxlength: 145,
    required: true,
  },
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UsersSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("Users", UsersSchema);
