import bcrypt from "bcrypt";
import HttpError from "./httpErrors.js";

export const hashPassWord = (password) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw new HttpError(500, error.message);
  }
};
