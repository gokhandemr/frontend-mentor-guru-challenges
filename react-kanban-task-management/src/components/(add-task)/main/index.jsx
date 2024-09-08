import React, {useState} from "react";
// Style
import style from "./style.module.css";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {addNewTask} from "../../../redux/slices/dataSlice";
import { setAddTaskIsActive } from "../../../redux/slices/popupsSlice";
// Component
import Subtask from "../subtask";

export default function AddTask() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.data.board);
  const boardColumnNames = board.columns.map((column) => column.name);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [status, setStatus] = useState(boardColumnNames ? boardColumnNames[0] : "");

  const [addSubtaskIsActive, setAddSubtaskIsActive] = useState(false);

  const createTaskButton = () => {
    if (title.trim() !== "" && status !== "") {
      const newTask = {title: title, description: desc, status: status, subtasks: subtasks};
      dispatch(addNewTask(newTask));
      dispatch(setAddTaskIsActive(false));
    } else {
      alert("Error: The title cannot be empty.");
    }
  };

  return (
    <>
      <div className={style.background} onClick={() => dispatch(setAddTaskIsActive(false))}></div>
      <div className={`${style.addNewTaskWrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <h5>Add New Task</h5>

        <h6>Title</h6>
        <input placeholder="e.g. Take coffee break" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <h6>Description</h6>
        <textarea placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little." value={desc} onChange={(e) => setDesc(e.target.value)} />

        <h6>Subtasks</h6>
        {subtasks && subtasks.length > 0 ? (
          subtasks.map((subtask, index) => <Subtask key={index} subtask={subtask} subtasks={subtasks} setSubtasks={setSubtasks} readOnly={true} />)
        ) : (
          <p className={style.noSubtaskText}>You have not added a subtask yet</p>
        )}

        {addSubtaskIsActive ? (
          <Subtask subtasks={subtasks} setSubtasks={setSubtasks} readOnly={false} setAddSubtaskIsActive={setAddSubtaskIsActive} />
        ) : (
          <button className={style.addSubtaskButton} onClick={() => setAddSubtaskIsActive(true)}>
            + Add New Subtask
          </button>
        )}

        <h6>Status</h6>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {boardColumnNames && boardColumnNames.map((name, index) => <option key={index}>{name}</option>)}
        </select>

        <button className={style.createTaskButton} onClick={createTaskButton}>
          Create Task
        </button>
      </div>
    </>
  );
}
