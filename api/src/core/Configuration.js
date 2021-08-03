import { RouteRegistration } from "../routes/RouteRegistration.js";
import bodyParser from "body-parser";
import passport from "passport";
import { PassportConfiguration } from "./PassportConfiguration.js";

export class Configuration {
  static setupRouting(app) {
    console.log("Start setup routing ");
    RouteRegistration.register(app);
    console.log("Setup routing successfully");
  }

  static setupExpress(app) {
    console.log("Start setup Express");

    app.use(
      bodyParser.json({
        limit: "100mb",
      })
    );

    console.log("Setup Express successfully");
  }

  static setupCORS(app) {
    console.log("Start setup CORS");

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Nonce, Signature, Timestamp, No-Cache, Client-Request"
      );
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

      if ("OPTIONS" === req.method) {
        res.status(200).end();
      } else {
        next();
      }
    });

    console.log("Setup CORS successfully");
  }

  static setupAuthentication(app) {
    console.log("Start setup Authentication");
    app.use(passport.initialize());
    PassportConfiguration.initStrategies();
    console.log("Start setup Authentication successfully");
  }

  static setup(app) {
    try {
      Configuration.setupExpress(app);
      Configuration.setupCORS(app);
      Configuration.setupAuthentication(app);
      Configuration.setupRouting(app);
    } catch (e) {
      console.log("There is an error when starting server", e);

      throw e;
    }
  }
}
