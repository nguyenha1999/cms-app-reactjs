import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const ProcedureSchema = new Schema(
  {
    code: String,
    documents: [
      {
        _id: false,
        document: { type: Schema.Types.ObjectId, ref: "documents" },
        codeInProcedure: String,
      },
    ],
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

export default Mongoose.model("procedures", ProcedureSchema);
