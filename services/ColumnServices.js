import api from "./api";

export async function getAllColumns() {
  try{
    const response = await api.get("/columns");
    return response.data;
  }
  catch(error){
    console.error("Error fetching Columns:", error);
  }
  
}

export async function getColumnById(id) {
  const column = await api.get(`/columns/${id}`);
  return column.data;
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
