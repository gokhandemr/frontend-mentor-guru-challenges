import {useEffect} from "react";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {setBoard} from "../../redux/slices/dataSlice";
// Components
import Sidebar from "../../components/(sidebar)/main";
import Header from "../../components/(header)/main";
import Board from "../../components/(board)/main";
import EmptyBoard from "../../components/(empty-board)/main";
import EmptyColumn from "../../components/(empty-column)/main";
import Popups from "../../components/(pop-ups)/main";

export default function HomePage() {
  // Redux
  const dispatch = useDispatch();
  const boardName = useSelector((state) => state.data.boardName);
  const board = useSelector((state) => state.data.board);
  const boards = useSelector((state) => state.data.boards);
  const sidebarIsActive = useSelector((state) => state.sidebar.isActive);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  // "boardName" her değiştiğinde "board"da değişir.
  useEffect(() => {
    dispatch(setBoard(boardName));
  }, [boardName, board, boards]);

  const element = document.querySelector("body");
  useEffect(() => {
    if (darkThemeIsActive) {
      element.classList.add("dark-theme");
    } else {
      element.classList.remove("dark-theme");
    }
  }, [darkThemeIsActive]);

  return (
    <>
      <Header boardName={boardName} />
      <Sidebar />
      <main className={`${!sidebarIsActive ? "no-sidebar" : ""} ${darkThemeIsActive ? "dark-theme" : ""}`}>{!board ? <EmptyBoard /> : board.columns && board.columns.length <= 0 ? <EmptyColumn /> : <Board board={board} />}</main>
      <Popups />
    </>
  );
}
