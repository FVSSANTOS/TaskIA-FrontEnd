function adaptTasksToKanban(columns, tasks) {
  const grouped = {
    "todo": [],
    "in-progress": [],
    "done": [],
  };

  // cria estrutura baseada nas colunas reais
  columns.forEach((col) => {
    grouped[col.id] = [];
  });

  // distribui tasks dinamicamente
  tasks.forEach((task) => {
    if (grouped[task.columnId]) {
      grouped[task.columnId].push(task);
    }
  });

  return grouped;
}

export { adaptTasksToKanban };