import {useState} from "react";
// Style
import style from "./style.module.css";
// Component
import EditTask from "../../(edit-task)/main";
import DeleteTask from "../../(delete-task)/main";
import TaskDetails from "../../(task-details)/main";
// Redux
import {useSelector} from "react-redux";

export default function Task({task}) {
  const [taskViewIsActive, setTaskViewIsActive] = useState(false);
  const [taskEditIsActive, setTaskEditIsActive] = useState(false);
  const [taskDeleteIsActive, setTaskDeleteIsActive] = useState(false);

  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  return (
    <>
      <li className={`${style.todo} ${darkThemeIsActive ? style.darkTheme : ""}`} onClick={() => setTaskViewIsActive(true)}>
        <h4>{task.title}</h4>
        <p>{task.subtasks.length} subtasks</p>
      </li>

      {!taskEditIsActive && !taskDeleteIsActive && taskViewIsActive && <TaskDetails task={task} setTaskViewIsActive={setTaskViewIsActive} setTaskEditIsActive={setTaskEditIsActive} setTaskDeleteIsActive={setTaskDeleteIsActive} />}
      {taskEditIsActive && <EditTask task={task} setTaskEditIsActive={setTaskEditIsActive} />}
      {taskDeleteIsActive && <DeleteTask task={task} setTaskDeleteIsActive={setTaskDeleteIsActive} setTaskViewIsActive={setTaskViewIsActive} />}
    </>
  );
}
