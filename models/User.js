import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
const { isEmail } = validator;
const { Schema, model } = mongoose;

const userSchema = new Schema({
 fullName: {
    type: String,
    required: [true, "Please enter a full name"]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please enter an email"],
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Please enter at least six characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  userType: {
    type: String,
    enum: ["client", "builder", "admin"],
    default: "client",    
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Invalid password");
  }
  throw Error("Invalid email");
};

const User = mongoose.model("user", userSchema);
export default User;