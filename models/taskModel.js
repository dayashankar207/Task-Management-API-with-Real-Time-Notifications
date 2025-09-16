import pool from "../config/db.js";

export async function createTask(title, description, assignedTo, createdBy) {
  const query = `
    INSERT INTO tasks (title, description, assigned_to, created_by)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [
    title,
    description,
    assignedTo,
    createdBy,
  ]);
  return rows[0];
}

export async function getAllTasks() {
  const { rows } = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  return rows;
}

export async function getTaskById(id) {
  const { rows } = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
  return rows[0];
}

export async function updateTask(id, title, description, assignedTo, status) {
  const query = `
    UPDATE tasks
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      assigned_to = COALESCE($3, assigned_to),
      status = COALESCE($4, status),
      updated_at = NOW()
    WHERE id = $5
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    title,
    description,
    assignedTo,
    status,
    id,
  ]);

  return rows[0] || null;
}

// Delete a task
export async function deleteTask(id) {
  const { rows } = await pool.query(
    "DELETE FROM tasks WHERE id=$1 RETURNING *",
    [id]
  );
  return rows[0];
}

// Get tasks assigned to a user
export async function getTasksByUser(userId) {
  const { rows } = await pool.query(
    "SELECT * FROM tasks WHERE assigned_to=$1",
    [userId]
  );
  return rows;
}
