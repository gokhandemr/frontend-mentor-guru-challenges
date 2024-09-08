// Style
import style from "./style.module.css";
// Icon
import menuOpenIcon from "../../../assets/icon-vertical-ellipsis.svg";
import menuCloseIcon from "../../../assets/icon-cross.svg";
// Mobile Logo
import mobileLogo from "../../../assets/logo-mobile.svg";
import mobileDownButton from "../../../assets/icon-chevron-down.svg";
// Components
import AddNewTaskButton from "../add-new-task-button";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {setBoardMenuIsActive, setDeleteButtonIsActive, setEditBoardIsActive} from "../../../redux/slices/popupsSlice";

export default function Header({boardName}) {
  const board = useSelector((state) => state.data.board);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);
  const boardMenuIsActive = useSelector((state) => state.popups.boardMenuIsActive);
  const sidebarIsActive = useSelector((state) => state.sidebar.isActive);
  const dispatch = useDispatch();

  const openMobileSidebar = () => {
    const asideElement = document.querySelector("aside");
    asideElement.style.display = "block";
    const mobileBackground = document.querySelector(".mobile-background");
    mobileBackground.style.display = "block";
  };

  return (
    <header className={`${style.header} ${darkThemeIsActive ? style.darkTheme : ""} ${!sidebarIsActive ? style.fullWidth : ""}`}>
      <div>
        <img className={style.mobileLogo} src={mobileLogo} alt="mobile logo" />

        <h1>{boardName}</h1>

        <button className={style.mobileDownButton} onClick={() => openMobileSidebar()}>
          <img src={mobileDownButton} alt="mobile down button" />
        </button>
      </div>
      <div>
        {board && (
          <>
            <AddNewTaskButton />
            <button className={style.menuButton} onClick={() => dispatch(setBoardMenuIsActive(!boardMenuIsActive))}>
              {boardMenuIsActive ? <img src={menuCloseIcon} alt="menu icon" /> : <img src={menuOpenIcon} alt="menu icon" />}
            </button>
          </>
        )}

        {boardMenuIsActive && (
          <>
            <div className={style.background} onClick={() => dispatch(setBoardMenuIsActive(false))}></div>
            <div className={style.boardMenu}>
              <button onClick={() => (dispatch(setEditBoardIsActive(true)), dispatch(setBoardMenuIsActive(false)))}>Edit Board</button>
              <button onClick={() => dispatch(setDeleteButtonIsActive(true))}>Delete Board</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
