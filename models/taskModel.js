import pool from "../config/db";

export async function createTask(user_id, title, description, status) {
  const query = `
    INSERT INTO tasks (user_id, title, description, status)
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, title, description, status, created_at;
  `;
  const { rows } = await pool.query(query, [
    user_id,
    title,
    description,
    status,
  ]);
  return rows[0];
}

export async function updateTask(id, title, description, status) {
  const query = `
        UPDATE tasks 
        SET title = 1$, description = 2$, status=3$
        WHERE id=4$
        RETURNING id, title , description , status , created_at
    `;
  const { rows } = await pool.query(query, [title, description, status]);
  return rows[0];
}

export async function getAllTasks() {
  const { rows } = await pool.query("SELECT * from tasks ORDER BY id ASC ");
  return rows;
}

export async function getTaskByID(id) {
  const { rows } = await pool.query("SELECT * from tasks WHERE id=$1", [id]);
  return rows[0];
}

export async function deleteTask(id) {
  const { rows } = await pool.query("DELETE * from tasks WHERE id=$1", [id]);
  return rows[0];
}
