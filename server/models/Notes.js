import pool from "../db.js";

export default class Notes {
  constructor(id, title, content, x, y, theme, created_at, updated_at) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.x = x;
    this.y = y;
    this.theme = theme;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async create(title, content, x, y, theme) {
    const query = `INSERT INTO notes(title, content, x, y, theme) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const result = await pool.query(query, [title, content, x, y, theme]);

    return result.rows[0];
  }
}
