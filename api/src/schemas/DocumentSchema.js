import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const DocumentSchema = new Schema(
  {
    name: String,
    code: { type : String , unique : true, required : true },
    edition: {
      type: Number,
      default: 1,
    },
    file: { type: Schema.Types.ObjectId, ref: "files" },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

export default Mongoose.model("documents", DocumentSchema);
