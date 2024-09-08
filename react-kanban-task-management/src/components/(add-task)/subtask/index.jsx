import {useState} from "react";
// Style
import style from "./style.module.css";
// Icons
import deleteIcon from "../../../assets/icon-cross.svg";
import submitIcon from "../../../assets/icon-check.svg";

export default function Subtask({subtasks, setSubtasks, readOnly, subtask, setAddSubtaskIsActive}) {
  const [value, setValue] = useState("");

  const addSubtask = (e) => {
    e.preventDefault();
    if (value !== "") {
      const newSubtask = {title: value, isCompleted: false};
      setSubtasks([...subtasks, newSubtask]);
      setAddSubtaskIsActive(false);
      setValue("");
    } else {
      alert("Subtask is empty");
    }
  };

  const deleteTaskButton = () => {
    const filterSubtasks = subtasks.filter((item) => item.title !== subtask.title && item);
    setSubtasks(filterSubtasks);
  };

  return !readOnly ? (
    <form className={style.wrapper} onSubmit={addSubtask}>
      <input placeholder="add new subtask.." type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button>
        <img src={submitIcon} alt="submit icon" />
      </button>
    </form>
  ) : (
    <div className={style.readOnlyWrapper}>
      <input type="text" value={subtask.title} readOnly />
      <button onClick={deleteTaskButton}>
        <img src={deleteIcon} alt="delete icon" />
      </button>
    </div>
  );
}
