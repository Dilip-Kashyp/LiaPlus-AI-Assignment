import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;
dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default {
  query: (text, params) => pool.query(text, params),
};
