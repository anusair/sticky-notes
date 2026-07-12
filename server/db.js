import dotenv from "dotenv";
import pkg from "pg";


dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


pool.query("SELECT NOW()")
  .then(res => {
    console.log("Connected to the database!");
    console.log(res.rows[0]);
  })
  .catch(err => console.error(err));

export default pool;