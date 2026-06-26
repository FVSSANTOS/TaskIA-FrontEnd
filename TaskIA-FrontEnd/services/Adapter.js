function adaptTasksToKanban(columns, tasks) {
  const grouped = columns.reduce((acc, column) => {
    acc[column.id] = [];
    return acc;
  }, {});

  (tasks || []).forEach((task) => {
    if (!task || !task.columnId) {
      return;
    }

    if (grouped[task.columnId]) {
      grouped[task.columnId].push(task);
    }
  });

  return grouped;
}

export { adaptTasksToKanban };
