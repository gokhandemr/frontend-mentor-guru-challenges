// Redux
import {useDispatch, useSelector} from "react-redux";
import {deleteBoard} from "../../../redux/slices/dataSlice";
import {setBoardMenuIsActive, setDeleteButtonIsActive} from "../../../redux/slices/popupsSlice";
// Style
import style from "./style.module.css";

export default function DeleteBoard() {
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.data.boards);
  const boardNames = boards.map((board) => board.name);
  const boardName = useSelector((state) => state.data.boardName);

  const deleteBoardButton = () => {
    dispatch(deleteBoard(boardName));
    dispatch(changeBoardName(boardNames[0]));
    dispatch(setBoardMenuIsActive(false));
  };

  return (
    <>
      <div className={style.background} onClick={() => dispatch(setDeleteButtonIsActive(false))}></div>
      <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <h2>Delete this board?</h2>
        <p>
          Are you sure you want to delete the <strong>‘{boardName}’</strong> board? This action will remove all columns and tasks and cannot be reversed.
        </p>
        <button className={style.deleteButton} onClick={deleteBoardButton}>
          Delete
        </button>
        <button className={style.cancelButton} onClick={() => dispatch(setDeleteButtonIsActive(false))}>
          Cancel
        </button>
      </div>
    </>
  );
}
