import Users from "../models/Users.js";

import UnauthorizedError from "../utils/UnauthorizedError.js";
import ConflictError from "../utils/ConflictError.js";
import ValidationError from "../utils/ValidationError.js";

// node.js libraries
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto, { hash } from "node:crypto";
import NotFoundError from "../utils/NotFoundError.js";

class AuthService {
  static async createUser(name, email, password, profile_img) {
    const existingEmail = await Users.findByEmail(email);
    const existingUsername = await Users.findByUsername(name);

    if (existingUsername) {
      throw new ConflictError(
        "The username is taken.",
        "USERNAME_ALREADY_EXISTS"
      );
    }

    if (existingEmail) {
      throw new ConflictError("Email already exists", "EMAIL_ALREADY_EXISTS");
    }

    if (!name || !email || !password) {
      throw new ValidationError("Missing required fields.", "MISSING_FIELDS");
    }

    if (password.length < 8) {
      throw new ValidationError(
        "Password must be at least 8 characters.",
        "PASSWORD_TOO_SHORT"
      );
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      throw new ValidationError(
        "Password must contain an uppercase letter and a number.",
        "PASSWORD_TOO_WEAK"
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await Users.create({
      name,
      email,
      password: passwordHash,
      profile_img,
    });

    console.log("created user: ", user);
    return user;
  }

  static async login(email, password) {
    email = email.trim().toLowerCase();

    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }

    const user = await Users.findByEmail(email);
    console.log("user: ", user);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    console.log("user validation passed!");
    console.log(user.password);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    console.log("password validation passed");

    console.log("all validations have passed!");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { user, token };
  }

  static async logout() {}

  static async forgotPassword(email) {
    const user = await Users.findByEmail(email);

    console.log("user has been found!");

    const { resetToken, hashedResetToken, passwordResetTokenExpires } =
      this.createResetPasswordToken();

    console.log("reset token length = ", resetToken);

    console.log(
      "Rehashed immediately:",
      crypto.createHash("sha256").update(resetToken).digest("hex")
    );

    console.log("hashed reset token = ", hashedResetToken);

    await Users.updatePasswordResetToken(user.id, hashedResetToken);

    return resetToken;
    // reset token should be send to the user via email.
    // this should be implemented through a third party service
  }

  static async resetPassword(token) {
    // token = token.trim();
    console.log("Length:", token.length);
    console.log("Last character:", JSON.stringify(token[token.length - 1]));
    console.log("Last char code:", token.charCodeAt(token.length - 1));
    if (!token) {
      throw new NotFoundError(
        "There is no token provided.",
        "TOKEN_NOT_AVAILABLE"
      );
    }

    console.log("passed token validation");
    console.log("token to be hashed: ", token);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log("token after hashing: ", hashedToken);

    const user = await Users.checkToken(hashedToken);

    console.log(
      "retrieved user from the database where the token matches: ",
      user
    );
  }

  static createResetPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString("hex"); // this should be sent to the user

    const hashedResetToken = crypto // this is stored in the database
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // also this one iis stored in the database

    return {
      resetToken,
      hashedResetToken,
      passwordResetTokenExpires,
    };
  }
}

export default AuthService;
