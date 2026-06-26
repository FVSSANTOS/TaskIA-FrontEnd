import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

const priorityToFrontend = {
  "Alta": "high",
  "Média": "medium",
  "Baixa": "low"
};

const priorityToBackend = {
  "high": "Alta",
  "medium": "Média",
  "low": "Baixa"
};

function mapBackendToFrontend(task) {
  return {
    id: task.id,
    columnID: task.columnID || "backlog",
    title: task.titulo || "",
    description: task.descricao || "",
    priority: priorityToFrontend[task.prioridade] || task.priority || "low",
    effort: task.esforco || "",
    createdBy: task.createdBy || "Current User",
    createdAt: task.createdAt || new Date().toISOString(),
    assignedTo: task.assignedTo || "Current User",
    updatedAt: task.updatedAt || null
  };
}

function mapFrontendToBackend(task) {
  return {
    id: task.id,
    columnID: task.columnID || "backlog",
    titulo: task.title || "",
    descricao: task.description || "",
    prioridade: priorityToBackend[task.priority] || "Baixa",
    esforco: task.effort || "",
    createdBy: task.createdBy || "Current User",
    createdAt: task.createdAt || new Date().toISOString(),
    assignedTo: task.assignedTo || "Current User",
    updatedAt: task.updatedAt || null
  };
}

export async function getAll() {
  const res = await axios.get(API_URL);
  return (res.data || []).map(mapBackendToFrontend);
}

export async function getTaskById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return mapBackendToFrontend(res.data);
}

export async function createTask(task) {
  const backendTask = mapFrontendToBackend(task);
  const res = await axios.post(API_URL, backendTask);
  return mapBackendToFrontend(res.data);
}

export async function updateTask(id, task) {
  const backendTask = mapFrontendToBackend(task);
  const res = await axios.put(`${API_URL}/${id}`, backendTask);
  return mapBackendToFrontend(res.data);
}

export async function deleteTask(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
