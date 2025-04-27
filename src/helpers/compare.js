import bcrypt from "bcrypt";
import HttpError from "./httpErrors.js";

export const comparePass = (myPlaintextPassword, hash) => {
  try {
    return bcrypt.compareSync(myPlaintextPassword, hash);
  } catch (error) {
    throw new HttpError(500, error.message);
  }
};
