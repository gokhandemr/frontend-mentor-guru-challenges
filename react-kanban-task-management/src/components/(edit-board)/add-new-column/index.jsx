import React, {useState} from "react";
// Icon
import addIcon from "../../../assets/icon-check.svg";
// Style
import style from "./style.module.css";

export default function AddNewColumn({setButtonIsActive, boardColumns, setBoardColumns}) {
  const [inputValue, setInputValue] = useState("");

  const addNewColumn = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newColumn = {name: inputValue, tasks: []};
      setBoardColumns([...boardColumns, newColumn]);
      setButtonIsActive(false);
    } else {
      alert("Error: column name cannot be empty");
    }
  };
  return (
    <form onSubmit={addNewColumn} className={style.newColumnWrapper}>
      <input placeholder="column name.." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button type="submit">
        <img src={addIcon} alt="add icon" />
      </button>
    </form>
  );
}
