import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from "passport-jwt";
import UserModel from "../schemas/UserSchema.js";

export class PassportConfiguration {
  static initStrategies() {
    passport.use(
      "signup",
      new localStrategy(
        {
          usernameField: "email",
          passReqToCallback: true,
        },
        async (req, email, password, done) => {
          try {
            const isExist = await UserModel.countDocuments({ email });

            if (isExist > 0) {
              return done(null, false, {
                message: `This email ${email} has been existed`,
              });
            }

            const user = await UserModel.create(req.body);

            return done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      "signin",
      new localStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (email, password, done) => {
          try {
            const user = await UserModel.findOne({ email });

            if (!user) {
              return done(null, false, { message: "User not found" });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
              return done(null, false, { message: "Wrong Password" });
            }

            return done(null, user, { message: "Logged in Successfully" });
          } catch (error) {
            return done(error);
          }
        }
      )
    );

    passport.use(
      new JWTstrategy(
        {
          secretOrKey: process.env.SECRET_KEY,
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
          try {
            return done(null, token);
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      "basic",
      new JWTstrategy(
        {
          secretOrKey: process.env.SECRET_KEY,
          jwtFromRequest: ExtractJWT.fromUrlQueryParameter("access_token"),
        },
        async (token, done) => {
          try {
            return done(null, token);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }
}
