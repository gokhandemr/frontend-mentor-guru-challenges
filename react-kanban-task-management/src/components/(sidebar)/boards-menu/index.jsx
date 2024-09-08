// Style
import style from "./style.module.css";
// icons
import listIcon from "../../../assets/icon-board.svg";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {changeBoardName} from "../../../redux/slices/dataSlice";
import {setCreateBoardIsActive} from "../../../redux/slices/popupsSlice";

export default function BoardsMenu() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.boards);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const boardName = useSelector((state) => state.data.boardName);
  const boardsNames = data && data.map((board) => board.name);

  return (
    <>
      <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <p className={style.allBoardsText}>ALL BOARDS {boardsNames && `(${boardsNames.length})`}</p>

        <ul>
          {boardsNames &&
            boardsNames.map((name, index) => (
              <li key={index} className={`${name === boardName ? style.active : ""}`} onClick={() => dispatch(changeBoardName(`${name}`))}>
                <img src={listIcon} alt="icon" />
                <p>{name}</p>
              </li>
            ))}
          <li onClick={() => dispatch(setCreateBoardIsActive(true))}>
            <img src={listIcon} alt="icon" />
            <p>+ Create New Board</p>
          </li>
        </ul>
      </div>
    </>
  );
}
