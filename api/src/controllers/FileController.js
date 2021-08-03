import formidable from "formidable";
import FileModel from "../schemas/FileSchema.js";
import TrackingDownloadModel from "../schemas/TrackingDownloadSchema.js";

export class FileController {
  static async upload(request, response) {
    const form = formidable({
      uploadDir: "uploads",
      keepExtensions: true,
      keepFilenames: true,
    });

    form.on("fileBegin", function (field, file) {
      file.path = form.uploadDir + "/" + new Date().getTime() + "_" + file.name;
    });

    form.parse(request, async (err, fields, files) => {
      if (err) {
        response.json({
          status: "Failed",
          message: `Upload file has been occurred something error ${err}`,
        });
      }

      const file = files[""];

      const createdFile = await FileModel.create({
        url: file.path,
        name: file.name,
        size: file.size,
        type: file.type,
        user: request.user._id,
      });

      response.json(createdFile);
    });
  }

  static async download(request, response) {
    const fileId = request.params.id,
      userDownloadId = request.user._id;

    const file = await FileModel.findById(fileId);

    await TrackingDownloadModel.create({
      file: fileId,
      uploadBy: file.user,
      downloadBy: userDownloadId,
    });

    response.download(file.url, file.name);
  }
}
