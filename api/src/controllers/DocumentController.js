import DocumentModel from "../schemas/DocumentSchema.js";
import ActivityModel from "../schemas/ActivitySchema.js";

export class DocumentController {
  static async retrieve(request, response) {
    const userId = request.user._id;

    let { page, pageSize } = Object.assign({
      page: 1,
      pageSize: 20,
    }, request.query);

    page = + page;
    pageSize = + pageSize;

    const document = await DocumentModel.find({ user: userId, deleted: false })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("file");

    const count = await DocumentModel.countDocuments({
      user: userId,
      deleted: false,
    });

    response.json({
      total: count,
      data: document,
    });
  }

  static async create(request, response) {
    const isExist = await DocumentModel.exists({
      code: request?.body?.code,
    });

    if (isExist) {
      return response.status(400).json({
        error: true,
        message: `Mã đã tồn tại`,
      });
    }

    let document = await DocumentModel.create({
      ...request.body,
      user: request.user._id,
    });

    document = await DocumentModel.findById(document._id).populate("file");

    await ActivityModel.create({
      content: `${request.user.fullName} tạo tài liệu ${document.name}, mã tài liệu ${document.code}, file tài liệu ${document.file.name}`,
      user: request.user._id,
      document: document._id
    });

    response.json(document);
  }

  static async update(request, response) {
    const documentId = request.params.id,
      data = request.body;

    delete data.edition;

    let oldValue = await DocumentModel.findById(documentId);

    if (oldValue?.code !== data?.code) {
      const isExist = await DocumentModel.exists({
        code: data?.code,
      });

      if (isExist) {
        return response.status(400).json({
          error: true,
          message: `Mã đã tồn tại`,
        });
      }
    }

    let document = await DocumentModel.findByIdAndUpdate(documentId, data);

    await DocumentModel.findByIdAndUpdate(documentId, { $inc: { edition: 1 } });

    document = await DocumentModel.findById(documentId).populate("file");

    let content = `${request.user.fullName} sửa tài liệu ${oldValue.name}`;

    let flag = false;

    if (data.name != oldValue.name) {
      content += `, sửa tên tài liệu ${oldValue.name} thành ${data.name}`;
      flag = true;
    }
    if (data.code != oldValue.code) {
      content += `${flag ? ',' : ''} sửa mã tài liệu ${oldValue.code} thành ${data.code}`;
      flag = true;
    }
    if (data.file != oldValue.file._id) {
      content += `${flag ? ',' : ''}sửa file ${oldValue.file.name} thành ${document.file.name}`;
    }

    await ActivityModel.create({
      content: content,
      user: request.user._id,
      document: document._id
    });

    response.json(document);
  }

  static async deleteById(request, response) {
    const documentId = request.params.id;

    const document = await DocumentModel.findByIdAndUpdate(documentId, {
      deleted: true,
    });

    response.json(document);
  }
}
