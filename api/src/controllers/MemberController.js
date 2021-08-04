import mongoose from "mongoose";
import UserModel from "../schemas/UserSchema.js";

export class MemberController {
  static async create(request, response) {
    const userId = request.user._id;
    const data = request.body;

    const isExist = await UserModel.exists({
      email: data?.email,
    });

    if (isExist) {
      return response.status(400).json({
        message: `This email ${data?.email} has been existed`,
      });
    }

    const user = await UserModel.create({
      ...data,
      role: "member",
      createdBy: userId,
    });

    response.json(user);
  }

  static async delete(request, response) {
    const userId = request.params._id;

    const user = await UserModel.findOneAndDelete({
      _id: userId,
    });

    response.json(user);
  }

  static async update(request, response) {
    const userId = request.params._id;
    const data = request.body;

    const user = await UserModel.findByIdAndUpdate(userId, data);
    user.lastName = data.lastName;
    user.email = data.email;
    user.firstName = data.firstName;
    user.fullName = data.fullName;
    response.json(user);
  }

  static async retrieve(request, response) {
    const userId = request.user._id;

    const result = await UserModel.aggregate([
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(userId),
          role: "member",
        },
      },
      {
        $lookup: {
          from: "files",
          localField: "_id",
          foreignField: "user",
          as: "uploads",
        },
      },
      {
        $addFields: {
          totalUpload: { $size: "$uploads" },
        },
      },
      {
        $unset: ["uploads"],
      },
      {
        $lookup: {
          from: "trackingdownloads",
          localField: "_id",
          foreignField: "downloadBy",
          as: "downloads",
        },
      },
      {
        $addFields: {
          totalDownload: { $size: "$downloads" },
        },
      },
      {
        $unset: ["downloads"],
      },
    ]);

    response.json(result);
  }
}
