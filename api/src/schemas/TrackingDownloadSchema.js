import Mongoose from "mongoose";
const Schema = Mongoose.Schema;

const TrackingDownloadSchema = new Schema(
  {
    file: { type: Schema.Types.ObjectId, ref: "files" },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    uploadBy: { type: Schema.Types.ObjectId, ref: "users" },
    downloadBy: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

export default Mongoose.model("trackingDownloads", TrackingDownloadSchema);
