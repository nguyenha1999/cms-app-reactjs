import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const FileSchema = new Schema(
  {
    url: String,
    name: String,
    size: Number,
    type: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

export default Mongoose.model("files", FileSchema);
