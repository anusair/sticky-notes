import pool from "../db.js";

export default class Notes {
  constructor(
    id,
    title,
    content,
    x,
    y,
    theme,
    created_at,
    updated_at,
    user_id
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.x = x;
    this.y = y;
    this.theme = theme;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_id = user_id;
  }

  static async create(title, content, x, y, theme, user_id) {
    const query = `INSERT INTO notes(title, content, x, y, theme , user_id) VALUES ($1, $2, $3, $4, $5 , $6) RETURNING *`;

    const result = await pool.query(query, [
      title,
      content,
      x,
      y,
      theme,
      user_id,
    ]);

    return result.rows[0];
  }

  static async getAll(user_id) {
    try {
      let query = `SELECT * FROM notes 
                  WHERE user_id = $1`;
      const result = await pool.query(query, [user_id]);

      return result.rows;
    } catch (error) {
      console.log("error from the db ", error);
    }
  }

  static async updateNote(id, title, content, x, y, theme) {
    const query = `
      UPDATE notes
      SET
          title = COALESCE($2, title),
          content = COALESCE($3, content),
          x = COALESCE($4, x),
          y = COALESCE($5, y),
          theme = COALESCE($6, theme)
      WHERE id = $1
      RETURNING *;`;

    const result = await pool.query(query, [id, title, content, x, y, theme]);

    return result.rows[0];
  }

  static async updatePosition(id, x, y) {
    const query = `
      UPDATE notes
       SET x = $2,
           y = $3
       WHERE id = $1 RETURNING *`;

    const result = await pool.query(query, [id, x, y]);
    return result.rows[0];
  }

  static async deleteNote(id) {
    const query = `DELETE FROM notes WHERE id = $1`;

    await pool.query(query, [id]);
  }

  static async updateNoteTheme(id, theme) {
    const query = `
      UPDATE notes
      SET theme = $2
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id, theme]);

    return result.rows[0];
  }
}
