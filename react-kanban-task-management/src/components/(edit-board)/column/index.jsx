// Style
import style from "./style.module.css";
// Icon
import deleteIcon from "../../../assets/icon-cross.svg";

export default function Column({name, boardColumns, setBoardColumns}) {
  const deleteColumn = () => {
    const newColumns = boardColumns.filter((column) => column.name !== name && column);
    setBoardColumns(newColumns);
  };

  return (
    <div className={style.columnWrapper}>
      <input value={name} readOnly />
      <button onClick={deleteColumn}>
        <img src={deleteIcon} alt="delete icon" />
      </button>
    </div>
  );
}
