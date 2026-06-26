import api from "./api";

export async function getAllTasks() {
  try{
    const response = await api.get("/tasks");
    console.log("tasks:",response.data)
    return response.data;
  }
  catch(error){
    console.error("Error fetching tasks:", error);
  }
  
}

export async function getTaskById(id) {
  const task = await api.get(`/tasks/${id}`);
  return task.data;
}

export async function createTask(task) {
  const newTask = await api.post("/tasks", task);
  return newTask.data;
}

export async function updateTask(id, task) {
  const updatedTask = await api.put(`/tasks/${id}`, task);
  return updatedTask.data;
}

export async function deleteTask(id) {
  const deletedTask = await api.delete(`/tasks/${id}`);
  return deletedTask.data;
}
