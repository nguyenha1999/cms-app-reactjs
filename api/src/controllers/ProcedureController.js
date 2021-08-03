import ProcedureModel from "../schemas/ProcedureSchema.js";

export class ProcedureController {
  static standardizeCode(index) {
    if (index >= 0 && index <= 9) {
      return `0${index}`;
    }

    return index?.toString();
  }

  static async retrieve(request, response) {
    const userId = request.user._id;

    let { page, pageSize } = Object.assign({
      page: 1,
      pageSize: 20,
    }, request.query);

    page = + page;
    pageSize = + pageSize;

    const procedures = await ProcedureModel.find({
      user: userId,
      deleted: false,
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: 'documents.document',
        populate: [{
          path: 'file',
        }]
      })

    const count = await ProcedureModel.countDocuments({
      user: userId,
      deleted: false,
    });

    response.json({
      total: count,
      data: procedures,
    });
  }

  static async create(request, response) {
    const documentIds = request.body.documentIds;

    let numberOfProcedure = await ProcedureModel.countDocuments({});

    numberOfProcedure = ProcedureController.standardizeCode(
      numberOfProcedure + 1
    );

    const codeOfProcedure = `QT.${numberOfProcedure}`;

    const documentOfProcedure = documentIds?.map((documentId, index) => {
      index = ProcedureController.standardizeCode(index + 1);

      return {
        document: documentId,
        codeInProcedure: `BM.${codeOfProcedure}.${index}`,
      };
    });

    let procedure = await ProcedureModel.create({
      code: codeOfProcedure,
      documents: documentOfProcedure,
      user: request.user._id,
    });

    procedure = await ProcedureModel.findById(procedure._id).populate(
      "documents.document"
    );

    response.json(procedure);
  }

  static async update(request, response) {
    const procedureId = request.params.id;
    const documentIds = request.body.documentIds;

    let procedure = await ProcedureModel.findById(procedureId);

    const codeOfProcedure = procedure.code;

    const documentOfProcedure = documentIds?.map((documentId, index) => {
      index = ProcedureController.standardizeCode(index + 1);

      return {
        document: documentId,
        codeInProcedure: `BM.${codeOfProcedure}.${index}`,
      };
    });

    procedure = await ProcedureModel.findByIdAndUpdate(procedureId, {
      documents: documentOfProcedure,
    });

    procedure = await ProcedureModel.findById(procedure._id).populate(
      "documents.document"
    );

    response.json(procedure);
  }

  static async deleteById(request, response) {
    const procedureId = request.params.id;

    const document = await ProcedureModel.findByIdAndUpdate(procedureId, {
      deleted: true,
    });

    response.json(document);
  }
}
