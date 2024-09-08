import {useState} from "react";
// Style
import style from "./style.module.css";
// Component
import Subtask from "../subtask";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {editTask} from "../../../redux/slices/dataSlice";

export default function EditTask({task, setTaskEditIsActive}) {
  const board = useSelector((state) => state.data.board);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const columnsName = board && board.columns.map((column) => column.name);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [status, setStatus] = useState(task ? task.status : "");
  const [addSubtaskIsActive, setAddSubtaskIsActive] = useState(false);

  const saveChangesButton = () => {
    if (title.trim() !== "") {
      const updateTask = {title: title, description: description, status: status, subtasks: subtasks};
      const value = {task, updateTask};
      dispatch(editTask(value));
      setTaskEditIsActive(false);
    } else {
      alert("Error: Task name cannot be empty");
    }
  };

  return (
    <>
      <div className={style.background} onClick={() => setTaskEditIsActive(false)}></div>
      <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <h5>Edit Task</h5>
        <>
          <h6>Title</h6>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <h6>Description</h6>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <h6>Subtasks</h6>
          {subtasks && subtasks.length > 0 ? (
            subtasks.map((subtask, index) => <Subtask key={index} subtask={subtask} subtasks={subtasks} setSubtasks={setSubtasks} readOnly={true} />)
          ) : (
            <p className={style.noSubtaskText}>You have not yet added a subtask. After typing the subtask, press “enter” or “icon”</p>
          )}

          {addSubtaskIsActive ? (
            <Subtask subtasks={subtasks} setSubtasks={setSubtasks} setAddSubtaskIsActive={setAddSubtaskIsActive} />
          ) : (
            <button className={style.addSubtaskButton} onClick={() => setAddSubtaskIsActive(true)}>
              + Add New Subtask
            </button>
          )}

          <h6>Status</h6>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {columnsName &&
              columnsName.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
          </select>

          <button onClick={saveChangesButton} className={style.saveButton}>
            Save Changes
          </button>
        </>
      </div>
    </>
  );
}
