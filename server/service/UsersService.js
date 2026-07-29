import Users from "../models/Users.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UnauthorizedError from "../utils/UnauthorizedError.js";
import ConflictError from "../utils/ConflictError.js";

export default class UsersService {
  static async createUser(name, email, password, profile_img) {
    const existingEmail = await Users.findByEmail(email);

    if (existingEmail) {
      throw new ConflictError("Email already exists");
    }

    console.log("passed email validation!!");
    const passwordHash = await bcrypt.hash(password, 12);

    console.log("hashed password: ", passwordHash);

    const user = await Users.create({
      name,
      email,
      password: passwordHash,
      profile_img,
    });

    console.log("created user: ", user);
    return user;
  }

  static async getUserById(user_id) {
    console.log("received from service: ", user_id);
    const user = await Users.me(user_id);

    return user;
  }
}
