import passport from "passport";
import {
  DocumentController,
  FileController,
  ProcedureController,
  ActivityController,
  UserController,
  TrackingDownloadController,
} from "../controllers/index.js";
import { TestController } from "../controllers/Tescontroller.js";

export class RouteRegistration {
  static register(app) {

    app.get(
      "/test",
      TestController.create
    );
    app.get(
      "/documents",
      passport.authenticate("jwt", { session: false }),
      DocumentController.retrieve
    );
    app.post(
      "/documents",
      passport.authenticate("jwt", { session: false }),
      DocumentController.create
    );
    app.put(
      "/documents/:id",
      passport.authenticate("jwt", { session: false }),
      DocumentController.update
    );
    app.delete(
      "/documents/:id",
      passport.authenticate("jwt", { session: false }),
      DocumentController.deleteById
    );
    app.post(
      "/upload",
      passport.authenticate("jwt", { session: false }),
      FileController.upload
    );
    app.get(
      "/download/:id",
      passport.authenticate("basic", { session: false }),
      FileController.download
    );
    app.get(
      "/procedures",
      passport.authenticate("jwt", { session: false }),
      ProcedureController.retrieve
    );
    app.post(
      "/procedures",
      passport.authenticate("jwt", { session: false }),
      ProcedureController.create
    );
    app.put(
      "/procedures/:id",
      passport.authenticate("jwt", { session: false }),
      ProcedureController.update
    );
    app.delete(
      "/procedures/:id",
      passport.authenticate("jwt", { session: false }),
      ProcedureController.deleteById
    );
    app.get(
      "/activities/:id",
      passport.authenticate("jwt", { session: false }),
      ActivityController.retrieve
    );
    app.post(
      "/activities",
      passport.authenticate("jwt", { session: false }),
      ActivityController.create
    );

    app.post("/users/signup", UserController.signup);
    app.post("/users/signin", UserController.signin);

    app.put(
      "/users",
      passport.authenticate("jwt", { session: false }),
      UserController.update
    );
    app.get(
      "/users/overall",
      passport.authenticate("jwt", { session: false }),
      UserController.overall
    );
    app.get(
      "/trackingDownloads",
      passport.authenticate("jwt", { session: false }),
      TrackingDownloadController.retrieve
    );
  }
}
