import {useEffect, useState} from "react";
// Style
import style from "./style.module.css";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {editBoard} from "../../../redux/slices/dataSlice";
import {setEditBoardIsActive} from "../../../redux/slices/popupsSlice";
// Components
import Column from "../column";
import AddNewColumn from "../add-new-column";

export default function EditBoard() {
  const reduxBoard = useSelector((state) => state.data.board);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);
  const dispatch = useDispatch();

  const [boardName, setBoardName] = useState("");
  const [boardColumns, setBoardColumns] = useState([]);
  const [buttonIsActive, setButtonIsActive] = useState(false);

  useEffect(() => {
    setBoardName(reduxBoard.name);
    setBoardColumns(reduxBoard.columns);
  }, [reduxBoard]);

  const saveChangesButton = () => {
    if (boardName.trim() !== "") {
      const oldName = reduxBoard.name;
      const newBoard = {name: boardName, columns: boardColumns};
      const value = {oldName, newBoard};
      dispatch(editBoard(value));
      dispatch(setEditBoardIsActive(false));
    } else {
      alert("Error: board name cannot be empty");
    }
  };

  return (
    <>
      <div className={style.background} onClick={() => dispatch(setEditBoardIsActive(false))}></div>
      <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <h5>Edit Board</h5>

        <h6>Board Name</h6>
        <input value={boardName} onChange={(e) => setBoardName(e.target.value)} />

        <h6>Board Columns</h6>
        {boardColumns && boardColumns.map(({name}, index) => <Column key={index} name={name} boardColumns={boardColumns} setBoardColumns={setBoardColumns} />)}

        {buttonIsActive ? (
          <AddNewColumn setButtonIsActive={setButtonIsActive} boardColumns={boardColumns} setBoardColumns={setBoardColumns} />
        ) : (
          <button className={style.addNewColumnButton} onClick={() => setButtonIsActive(true)}>
            + Add New Column
          </button>
        )}

        <button className={style.saveChangesButton} onClick={saveChangesButton}>
          Save Changes
        </button>
      </div>
    </>
  );
}
