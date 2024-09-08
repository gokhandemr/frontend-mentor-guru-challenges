// Style
import style from "./style.module.css";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {taskViewTaskStatusChange} from "../../../redux/slices/dataSlice";

export default function SelectStatus({task, setTaskViewIsActive}) {
  const dispatch = useDispatch();
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);
  const board = useSelector((state) => state.data.board);
  const {columns} = board;

  const changeStatusOfTask = (e) => {
    // yeni task yaptık
    const newTask = {...task, status: e.target.value};
    // değerleri value'de topladık
    const value = {newStatus: e.target.value, oldStatus: task.status, newTask};
    // redux'a gönderdik
    dispatch(taskViewTaskStatusChange(value));
    // pop-up kapanması için
    setTaskViewIsActive(false);
  };

  return (
    <select className={`${style.selectStatus} ${darkThemeIsActive ? style.darkTheme : ""}`} value={task.status} onChange={(e) => changeStatusOfTask(e)}>
      {columns &&
        columns.map(({name}, index) => (
          <option key={index} value={`${name}`}>
            {name}
          </option>
        ))}
    </select>
  );
}
