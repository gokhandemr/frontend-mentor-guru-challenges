// Style
import style from "./style.module.css";
// Redux
import {taskViewSubtaskStatusChange} from "../../../redux/slices/dataSlice";
import {useDispatch, useSelector} from "react-redux";
// Icon
import iconCheck from "../../../assets/icon-check.svg";

export default function Subtask({subtask, columnName, taskTitle}) {
  const dispatch = useDispatch();
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const changeSubtasksStatus = () => {
    const value = {subtask, columnName, taskTitle};
    dispatch(taskViewSubtaskStatusChange(value));
  };

  return (
    <li className={`${style.subtask} ${subtask.isCompleted ? style.taskCompleted : ""} ${darkThemeIsActive ? style.darkTheme : ""}`} onClick={() => changeSubtasksStatus()}>
      <span className={style.checkbox}>
       {subtask.isCompleted && <img src={iconCheck} alt="check box icon" />} 
      </span>
      {subtask.title}
    </li>
  );
}
