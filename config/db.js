import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL successfully !");
    client.release();
  })
  .catch((err) => {
    console.log("PostgreSQL connection error", err.stack);
  });

export default pool;
