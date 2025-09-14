import pool from "../config/db.js";
import bcrypt from "bcrypt";

const salt = 10;

export async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, salt);

  const query = `
    INSERT INTO users (name, email ,password )
    VALUES ($1,$2,$3)
    RETURNING id, name , email , created_at
  `;
  const { rows } = await pool.query(query, [name, email, hashedPassword]);
  return rows[0];
}

export async function getAllUsers() {
  const { rows } = await pool.query("SELECT * from users ORDER BY id ASC");
  return rows;
}

export async function getUserById(id) {
  const { rows } = await pool.query("SELECT * from users WHERE id=$1", [id]);
  return rows[0];
}

export async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * from users WHERE email=$1", [
    email,
  ]);
  return rows[0];
}

export async function updateUser(id, name, email, password) {
  const updatedHashedPassword = await bcrypt.hash(password, salt);

  const query = `
    UPDATE users 
    SET name = $1, email = $2, password = $3
    WHERE id = $4
    RETURNING id, name, email;
  `;

  const { rows } = await pool.query(query, [
    name,
    email,
    updatedHashedPassword,
    id,
  ]);
  return rows[0];
}

export async function deleteUser(id) {
  const { rows } = await pool.query(
    "DELETE FROM users WHERE id=$1  RETURNING *",
    [id]
  );
  return rows[0];
}
