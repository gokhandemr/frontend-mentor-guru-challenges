import React, {useState} from "react";
// Style
import style from "./style.module.css";
// Icon
import checkIcon from "../../../assets/icon-check.svg";
import deleteIcon from "../../../assets/icon-cross.svg";
// Redux
import {useSelector} from "react-redux";

export default function CreateBoardColumn({item, column, setColumn, setCreateBoardColumnIsActive}) {
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const [name, setName] = useState("");

  const addColumn = (e) => {
    e.preventDefault();

    if (name.trim() !== "") {
      setColumn([...column, name]);
      setName("");
      setCreateBoardColumnIsActive(false);
    } else {
      alert("Error: column name cannot be empty.");
    }
  };

  const deleteButton = () => {
    const filterColumn = column.filter((itemColumn) => itemColumn !== item && itemColumn);
    setColumn(filterColumn);
  };

  return item ? (
    <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
      <input type="text" value={item} readOnly />
      <div onClick={deleteButton} className={style.deleteButton}>
        <img src={deleteIcon} alt="delete icon" />
      </div>
    </div>
  ) : (
    <form onSubmit={addColumn} className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
      <input type="text" placeholder="column name..." value={name} onChange={(e) => setName(e.target.value)} />
      <button>
        <img src={checkIcon} alt="check icon" />
      </button>
    </form>
  );
}
