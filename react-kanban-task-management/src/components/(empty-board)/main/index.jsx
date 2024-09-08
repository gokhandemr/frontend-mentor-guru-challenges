// Style
import style from "./style.module.css";
// Redux
import {useDispatch} from "react-redux";
import {setCreateBoardIsActive} from "../../../redux/slices/popupsSlice";

export default function EmptyBoard() {
  const dispatch = useDispatch();
  return (
    <div className={style.emptyWrapper}>
      <p className={style.emptyText}>There is no board. Create a new board to get started.</p>
      <button className={style.emptyButton} onClick={() => dispatch(setCreateBoardIsActive(true))}>
        + Create New Board
      </button>
    </div>
  );
}
