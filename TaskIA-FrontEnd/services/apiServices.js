import axios from "axios";

export async function getAll() {
  const usuarios = await axios.get("http://localhost:3000/api/tasks");
  return usuarios.data;
}

export async function getTaskById(id) {
  const task = await axios.get(`http://localhost:3000/api/tasks/${id}`);
  return task.data;
}

export async function createTask(task) {
  const newTask = await axios.post("http://localhost:3000/api/tasks", task);
  return newTask.data;
}

export async function updateTask(id, task) {
  const updatedTask = await axios.put(
    `http://localhost:3000/api/tasks/${id}`,
    task,
  );
  return updatedTask.data;
}

export async function deleteTask(id) {
  const deletedTask = await axios.delete(
    `http://localhost:3000/api/tasks/${id}`,
  );
  return deletedTask.data;
}
