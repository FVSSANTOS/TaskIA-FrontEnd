function adaptTasksToKanban(columns, tasksInit) {
  const grouped = {

  };

  // cria estrutura baseada nas colunas reais
  columns.forEach((col) => {
    grouped[col.id] = {
      titulo: col.titulo,
      tasks: []
    };
  });

  // distribui tasks dinamicamente
  tasksInit.forEach((task) => {
    if (grouped[task.columnID]) {
      grouped[task.columnID].tasks.push(task);
    }
  });
 
  return grouped;
}

export default  adaptTasksToKanban;

