import Mongoose from "mongoose";
import { sha256 } from "js-sha256";
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    fullName: String,
    password: String,
    role: {
      type: String,
      default: "administrator",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

UserSchema.pre("save", function (next) {
  this.password = sha256(this.password);

  this.fullName = `${this.firstName} ${this.lastName}`;

  next();
});

UserSchema.methods.isValidPassword = function (password) {
  return password === this.password;
};

export default Mongoose.model("users", UserSchema);
