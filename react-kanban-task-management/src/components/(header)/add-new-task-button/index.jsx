// Style
import style from "./style.module.css";
// Redux
import {useDispatch} from "react-redux";
import {setAddTaskIsActive} from "../../../redux/slices/popupsSlice";
// Mobile Icon
import mobileAddTaskIcon from "../../../assets/icon-add-task-mobile.svg";

export default function AddNewTaskButton() {
  const dispatch = useDispatch();
  return (
    <button className={style.newTaskButton} onClick={() => dispatch(setAddTaskIsActive(true))}>
      <img className={style.mobileAddTaskIcon} src={mobileAddTaskIcon} alt="mobile add task icon" />
      <span>+ Add New Task</span>
    </button>
  );
}
