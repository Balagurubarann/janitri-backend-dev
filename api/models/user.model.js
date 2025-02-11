const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3, 
      maxlength: 40,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (value) {
          return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Invalid email format",
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
