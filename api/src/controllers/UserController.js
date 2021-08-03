import passport from "passport";
import jwt from "jsonwebtoken";
import _ from "lodash";
import mongoose from "mongoose";
import moment from "moment";
import MomentRange from "moment-range";
MomentRange.extendMoment(moment);
import UserModel from "../schemas/UserSchema.js";
import DocumentModel from "../schemas/DocumentSchema.js";
import ProcedureModel from "../schemas/ProcedureSchema.js";
import FileModel from "../schemas/FileSchema.js";
import TrackingDownloadModel from "../schemas/TrackingDownloadSchema.js";

export class UserController {
  static async signup(request, response, next) {
    passport.authenticate("signup", function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return response.status(401).json({
          message: info.message,
        });
      }

      response.json(user);
    })(request, response, next);
  }

  static async signin(request, response, next) {
    passport.authenticate("signin", function (err, user, info) {
      try {
        if (err || !user) {
          return response.status(401).json(info);
        }

        user = user.toObject();

        delete user.password;

        const token = jwt.sign(user, process.env.SECRET_KEY);

        return response.json({ ...user, token });
      } catch (error) {
        return next(error);
      }
    })(request, response, next);
  }

  static generateDataFor2MonthAgo() {
    const start = moment().subtract(2, "month"),
      end = moment(),
      range = moment.range(moment(start), moment(end));

    const data2MonthAgo = [];

    for (const date of range.by("day")) {
      data2MonthAgo.push({
        date: date.format("YYYY-MM-DD"),
        count: 0,
      });
    }

    return data2MonthAgo;
  }

  static async groupDataFor2MonthAgo(
    model,
    userId,
    groupField,
    matchField = "user"
  ) {
    return await model.aggregate([
      {
        $match: {
          [matchField]: mongoose.Types.ObjectId(userId),
          [groupField]: {
            $gte: moment().subtract(2, "month").toDate(),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: `$${groupField}` },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: "$count",
        },
      },
    ]);
  }

  static async overall(request, response) {
    const userId = request.user._id;

    const data2MonthAgo = UserController.generateDataFor2MonthAgo();

    const documentStatistics = await UserController.groupDataFor2MonthAgo(
      DocumentModel,
      userId,
      "publishedDate"
    );

    const procedureStatistics = await UserController.groupDataFor2MonthAgo(
      ProcedureModel,
      userId,
      "createdDate"
    );

    const fileStatistics = await UserController.groupDataFor2MonthAgo(
      FileModel,
      userId,
      "createdDate"
    );

    const trackingDownloadStatistics =
      await UserController.groupDataFor2MonthAgo(
        TrackingDownloadModel,
        userId,
        "createdDate",
        "downloadBy"
      );

    response.json({
      document: _.sortBy(
        _.unionBy([...documentStatistics, ...data2MonthAgo], "date"),
        "date"
      ),
      procedure: _.sortBy(
        _.unionBy([...procedureStatistics, ...data2MonthAgo], "date"),
        "date"
      ),
      upload: _.sortBy(
        _.unionBy([...fileStatistics, ...data2MonthAgo], "date"),
        "date"
      ),
      download: _.sortBy(
        _.unionBy([...trackingDownloadStatistics, ...data2MonthAgo], "date"),
        "date"
      ),
    });
  }

  static async update(request, response) {
    const userId = request.user._id;
    const data = request.body;

    const user = await UserModel.findByIdAndUpdate(userId, data);

    response.json({
      ...user.toObject(),
      ...data,
    });
  }
}
