// Style
import style from "./style.module.css";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {setEditBoardIsActive} from "../../../redux/slices/popupsSlice";

export default function NewColumnButton() {
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);
  const dispatch = useDispatch();

  return (
    <button className={`${style.addColumnButton} ${darkThemeIsActive ? style.darkTheme : ""}`} onClick={() => dispatch(setEditBoardIsActive(true))}>
      + New Column
    </button>
  );
}
