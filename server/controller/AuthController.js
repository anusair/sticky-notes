import AuthService from "../service/AuthService.js";
import Users from "../models/Users.js";
import UnauthorizedError from "../utils/UnauthorizedError.js";
import NotFoundError from "../utils/NotFoundError.js";

class AuthController {
  static async register(req, res) {
    const { name, email, password, profile_img } = req.body;

    console.log("recieved data for a new user: ", name, email, password);
    const user = await AuthService.createUser(
      name,
      email,
      password,
      profile_img
    );

    console.log("created user: ", user);

    return res.status(201).json({ message: "user has been created.", user });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login(email, password);

    console.log("email from controller:", email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    console.log("finished logging the user.");
    return res.status(200).json({ message: "Logged in successfully.", user });
  }

  static async logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const token = await AuthService.forgotPassword(email);

    return res.status(200).json({
      message: "If the email exists, a password reset link has been sent.",
      token,
    });
  }

  static async resetPassword(req, res) {
    console.log(req.params.token);
    const token = req.params.token;

    console.log("token received from reset password controller: ", token);
    await AuthService.resetPassword(token);

    return res.status(200).json({ token });
  }
}

export default AuthController;
