// Style
import style from "./style.module.css";
//  Redux
import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../../../redux/slices/dataSlice";

export default function DeleteTask({task, setTaskDeleteIsActive, setTaskViewIsActive}) {
  const dispatch = useDispatch();
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const deleteTaskButton = () => {
    dispatch(deleteTask(task));
    setTaskDeleteIsActive(false);
    setTaskViewIsActive(false);
  };

  return (
    <>
      <div className={style.background} onClick={() => setTaskDeleteIsActive(false)}></div>
      <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <h2>Delete this task?</h2>
        <p>Are you sure you want to delete the <strong>'{task.title}'</strong> task and its subtasks? This action cannot be reversed.</p>
        <button className={style.deleteButton} onClick={deleteTaskButton}>
          Delete
        </button>
        <button className={style.cancelButton} onClick={() => setTaskDeleteIsActive(false)}>
          Cancel
        </button>
      </div>
    </>
  );
}
