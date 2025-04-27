import { comparePass } from "../helpers/compare.js";
import { hashPassWord } from "../helpers/hash.js";
import HttpError from "../helpers/httpErrors.js";
import User from "../models/model.user.js";
// import * as models from "../models/index.js";

class AuthService {
  async register({ email, name, password }) {
    // const { User } = models;
    try {
      if (!email || !password || !name)
        throw new HttpError("missing input", 400);
      const checkEmail = await User.findOne({
        where: {
          email,
        },
      });
      if (checkEmail) throw new HttpError("email duplicated", 509);
      const hashPass = hashPassWord(password);
      await User.create({
        email,
        name,
        password: hashPass,
      });

      return {
        ST: 200,
        EC: 0,
        EM: "REGISTER SUCCESSFULLY",
      };
    } catch (error) {
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
  async login({ email, password }) {
    try {
      if (!email || !password) throw new HttpError("missing input", 400);
      const isExistedEmail = await User.findOne({
        where: {
          email,
        },
        nest: true,
        raw: true,
      });
      if (!isExistedEmail) throw new HttpError("email or pass not found", 404);
      const isMatch = comparePass(password, isExistedEmail.password);
      if (!isMatch) throw new HttpError("email or pass wrong", 404);
      const { password: pass, ...rest } = isExistedEmail;
      return {
        ST: 200,
        EC: 0,
        EM: "LOGIN SUCCESSFULLY",
        data: rest,
      };
    } catch (error) {
      console.log(error);
      return {
        ST: error.status || 500,
        EC: 1,
        EM: error.message,
      };
    }
  }
}
export default new AuthService();
