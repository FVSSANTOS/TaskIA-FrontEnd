import api from "./api";

export async function getAllColumns() {
  const response = await api.get("/columns");
  console.log("Response from getAllColumns:", response.data); // Log the response data
  return response.data;
}

export async function createColumn(column) {
  const newColumn = await api.post("/columns", column);
  return newColumn.data;
}

export async function updateColumn(id, column) {
  const updatedColumn = await api.put(`/columns/${id}`, column);
  return updatedColumn.data;
}

export async function deleteColumn(id) {
  const deletedColumn = await api.delete(`/columns/${id}`);
  return deletedColumn.data;
}
