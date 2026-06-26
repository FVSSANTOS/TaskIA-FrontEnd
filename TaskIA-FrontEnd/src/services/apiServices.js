import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAll() {
  const usuarios = await axios.get(`${API_URL}/api/tasks`);
  return usuarios.data;
}

export async function getTaskById(id) {
  const task = await axios.get(`${API_URL}/api/tasks/${id}`);
  return task.data;
}

export async function createTask(task) {
  const newTask = await axios.post(`${API_URL}/api/tasks`, task);
  return newTask.data;
}

export async function updateTask(id, task) {
  const updatedTask = await axios.put(`${API_URL}/api/tasks/${id}`, task);
  return updatedTask.data;
}

export async function deleteTask(id) {
  const deletedTask = await axios.delete(`${API_URL}/api/tasks/${id}`);
  return deletedTask.data;
}

async function parseResponse(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || "Credenciais inválidas.");
  }
  return data;
}

export async function register(userData) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || `Erro ao criar conta. (status ${response.status})`);
  }
  return data;
}