import bcrypt, { hash } from "bcrypt";

export const Hashpassword = async (password) => {
  try {
    const salt = 10;
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
