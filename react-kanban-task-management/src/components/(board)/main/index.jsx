// Components
import Task from "../task";
import NewColumnButton from "../new-column-button";

export default function Board({board}) {
  const {columns} = board;


  return (
    <>
      {columns &&
        columns.map((column, index) => (
          <ul key={index}>
            <h3>{`${column.name} (${column.tasks.length})`}</h3>
            {column.tasks.map((task, index) => (
              <Task key={index} task={task} />
            ))}
          </ul>
        ))}
      <NewColumnButton />
    </>
  );
}
