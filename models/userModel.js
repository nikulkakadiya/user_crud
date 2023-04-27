const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Please enter a name"],
    },
    email: {
      type: "String",
      required: [true, "Please enter a email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    role: {
      type: "String",
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: "String",
      required: [true, "Please enter a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: "String",
      required: [true, "Please enter confirm password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "password are not the same",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
