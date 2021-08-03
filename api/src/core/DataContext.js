import Mongoose from "mongoose";

export class DataContext {
  static mongooseInstance = Mongoose;
  static mongooseConnection = Mongoose.connection;

  static connect() {
    const databaseName = process.env.DB_NAME;

    const connectionString =
      "mongodb://" + process.env.DB_CONNECTION_STRING + "/" + databaseName;

    console.log("Start connecting to database " + connectionString);

    let connectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    return Mongoose.connect(connectionString, connectOptions, (err) => {
      if (err) {
        console.log("Can't connect to database", err);
      }
    });
  }

  static init() {
    DataContext.connect();

    this.mongooseConnection.on("connected", () => {
      console.log("Connect to database successfully");
    });

    this.mongooseConnection.on("error", (err) => {
      console.log("Error when connecting to database", err);
    });
  }
}
