import mongoose from "mongoose";
import TrackingDownloadModel from "../schemas/TrackingDownloadSchema.js";

export class TrackingDownloadController {
  static async retrieve(request, response) {
    const userId = request.user._id;

    const top5TrackingDownload = await TrackingDownloadModel.aggregate([
      {
        $match: {
          uploadBy: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$file",
          file: {
            $first: "$file",
          },
          uploadBy: {
            $first: "$uploadBy",
          },
          downloadBy: {
            $first: "$downloadBy",
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users",
          localField: "uploadBy",
          foreignField: "_id",
          as: "uploadBy",
        },
      },
      {
        $unwind: "$uploadBy",
      },
      {
        $lookup: {
          from: "users",
          localField: "downloadBy",
          foreignField: "_id",
          as: "downloadBy",
        },
      },
      {
        $unwind: "$downloadBy",
      },
      {
        $lookup: {
          from: "files",
          localField: "file",
          foreignField: "_id",
          as: "file",
        },
      },
      {
        $unwind: "$file",
      },
    ]);

    response.json(top5TrackingDownload);
  }
}
