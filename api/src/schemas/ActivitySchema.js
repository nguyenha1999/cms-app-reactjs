import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const ActivitySchema = new Schema(
  {
    createdDate: {
      type: Date,
      default: Date.now,
    },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    document: { type: Schema.Types.ObjectId, ref: "documents" },
    content: String,
  },
  { versionKey: false }
);

export default Mongoose.model("activities", ActivitySchema);
