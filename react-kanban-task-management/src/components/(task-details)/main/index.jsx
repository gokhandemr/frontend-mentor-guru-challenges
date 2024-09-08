// Style
import style from "./style.module.css";
// Icon
import editButtonIcon from "../../../assets/icon-vertical-ellipsis.svg";
// Components
import Subtask from "../subtask";
import SelectStatus from "../select-status";
// Redux
import {useSelector} from "react-redux";

export default function TaskDetails({task, setTaskViewIsActive, setTaskEditIsActive, setTaskDeleteIsActive}) {
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  return (
    <>
      <div className={style.taskViewBackground} onClick={() => setTaskViewIsActive(false)}></div>
      <div className={`${style.taskView} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <div>
          <h5>{task.title}</h5>
          <button>
            <img src={editButtonIcon} alt="edit button" />
            <ul>
              <li onClick={() => setTaskEditIsActive(true)}>Edit Task</li>
              <li onClick={() => setTaskDeleteIsActive(true)}>Delete Task</li>
            </ul>
          </button>
        </div>
        {task.description && <p>{task.description}</p>}

        <div>
          <ul>
            <h6>Subtaks ({task.subtasks.length})</h6>
            {task.subtasks.map((subtask, index) => (
              <Subtask key={index} subtask={subtask} columnName={task.status} taskTitle={task.title} />
            ))}
          </ul>
        </div>

        <div>
          <h6>Current Status</h6>
          <SelectStatus task={task} setTaskViewIsActive={setTaskViewIsActive} />
        </div>
      </div>
    </>
  );
}
