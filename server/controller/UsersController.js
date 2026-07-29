import UsersService from "../service/UsersService.js";

export default class UsersController {
  static async createUsers(req, res) {
    const { name, email, password, profile_img } = req.body;

    console.log("recieved data for a new user: ", name, email, password);
    const user = await UsersService.createUser(
      name,
      email,
      password,
      profile_img
    );

    return res.status(201).json({ message: "user has been created.", user });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    console.log("email from controller:", email);

    const { user, token } = await UsersService.login(email, password);

    console.log("before assigning the user in cookies.");
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    console.log("finished logging the user.");
    return res.status(200).json({ message: "Logged in successfully.", user });
  }

  static async getUserById(req, res) {
    const user_id = req.user.id;

    console.log('received request for: ' , user_id)

    const user = await UsersService.getUserById(user_id);

    console.log('user logged in: ' , user)
    return res.status(200).json({ user });
  }
}
