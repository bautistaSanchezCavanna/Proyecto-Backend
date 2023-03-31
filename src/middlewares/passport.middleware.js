import passport from "passport";
import {userModel} from "../daos/models/users.model.js";
import { hashPassword, isValidPassword, cookieExtractor } from "../utils/utils.js";
import LocalStrategy from "passport-local";

import passportJwt from "passport-jwt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

import GithubStrategy from "passport-github2";
import EnvConfig from "../config/.env.config.js";


passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: EnvConfig.SECRET_KEY,
    },
    async (jwt_payload, done) => {
      try {
        const user = await userModel.findOne({ email: jwt_payload.email });
        if (!user) {
          return done(null, false, { messages: "User not found" });
        }
        return done(null, jwt_payload);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });
        if (!user) {
          done(null, false);
        } else {
          if (!isValidPassword(user, password)) {
            done(null, false);
          } else {
            const sessionUser = {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              age: user.age,
              email: user.email,
            };
            done(null, sessionUser);
          }
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
      const { first_name, last_name, age } = req.body;
      try {
        const user = await userModel.findOne({ email: username });
        if (user) {
          done(null, false);
        } else {
          const newUser = {
            first_name,
            last_name,
            age,
            role: username.split("@")[1].includes("admin") ? 'ADMIN': 'USER',
            email: username,
            password: hashPassword(password),
          };
          req.user = newUser;
          const userCreated = await userModel.create(newUser);
          done(null, userCreated);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.e21216c8af583bc7",
      clientSecret: "3b0df5dbc46d5f089f46851664ef39f5ce4979f9",
      callbackURL: "http://localhost:8080/api/users/github/authentication",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const data = profile._json;
        const user = await userModel.findOne({ email: data.email });
        if (!user) {
          const newUser = {
            first_name: data.name?.split(" ")[0],
            last_name: data.name?.split(" ")[1],
            age: data.age || null,
            email: data.email || null,
            password: null,
            githubLogin: data.login,
          };
          const userCreated = await userModel.create(newUser);
          done(null, userCreated._doc);
        } else {
          done(null, user);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

export default passport;
