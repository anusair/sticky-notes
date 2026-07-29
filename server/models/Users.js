import pool from "../db.js";

export default class Users {
  constructor(
    id,
    name,
    email,
    password,
    profile_img,
    passwordResetToken,
    passwordResetTokenExpires
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile_img = profile_img;
    this.passwordResetToken = passwordResetToken;
    this.passwordResetTokenExpires = passwordResetTokenExpires;
  }

  static async create({ name, email, password, profile_img }) {
    const query = `INSERT INTO users (name , email , password , profile_img)
                       VALUES ($1 , $2 , $3 , $4) 
                       RETURNING *`;

    const result = await pool.query(query, [
      name,
      email,
      password,
      profile_img,
    ]);

    return result.rows[0];
  }

  static async findByEmail(email) {
    console.log("received email: ", email);
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    console.log("found this user: ", result.rows[0]);
    return result.rows[0];
  }

  static async findByUsername(name) {
    const query = `SELECT name FROM users Where name = $1`;
    const result = await pool.query(query, [name]);

    return result.rows[0];
  }

  static async login(email) {
    const query = `SELECT * FROM users
                   WHERE email = $1`;

    console.log("the provided email: ", email);
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async me(user_id) {
    const query = `SELECT name, email FROM users 
                  WHERE id = $1`;

    const result = await pool.query(query, [user_id]);
    return result.rows[0];
  }

  static async updatePasswordResetToken(user_id, passwordResetToken) {
    const query = `UPDATE users 
                      SET password_reset_token = $1,
                          password_reset_token_expires = NOW() + INTERVAL '10 minutes'
                      WHERE id = $2`;

    const result = await pool.query(query, [passwordResetToken, user_id]);
  }

  static async checkToken(token) {
    const query = `SELECT * FROM users WHERE password_reset_token = $1`;

    const result = await pool.query(query, [token]);

    return result.rows[0];
  }
}
