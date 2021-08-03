import ActivityModel from "../schemas/ActivitySchema.js";

export class ActivityController {
  static async create(request, response) {
    const activity = request.body;

    const createdActivity = await ActivityModel.create({
      ...activity,
      user: request.user._id,
    });

    response.json(createdActivity);
  }

  static async retrieve(request, response) {

    const documentId = request.params.id;

    const { page, pageSize } = Object.assign(request.query, {
      page: 1,
      pageSize: 10,
    });
    const activities = await ActivityModel.find({ document: documentId })
      .populate("user")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const count = await ActivityModel.countDocuments({
      document: documentId
    });

    response.json({
      total: count,
      data: activities,
    });
  }
}
