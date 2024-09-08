// Style
import style from "./style.module.css";
// Redux
import {useDispatch} from "react-redux";
import {setEditBoardIsActive} from "../../../redux/slices/popupsSlice";

export default function EmptyColumn() {
  const dispatch = useDispatch();

  return (
    <>
      <div className={style.EmptyColumn}>
        <p className={style.EmptyColumnText}>This board is empty. Create a new column to get started.</p>
        <button className={style.EmptyColumnButton} onClick={() => dispatch(setEditBoardIsActive(true))}>
          + Create New Board
        </button>
      </div>
    </>
  );
}
