// Select UTable rows by id
export function onSelectById<T extends { id: string }>(selected: Ref<T[]>) {
  return (row: T) => {
    const index = selected.value.findIndex((item) => item.id === row.id);
    if (index === -1) {
      selected.value.push(row);
    } else {
      selected.value.splice(index, 1);
    }
  };
}
