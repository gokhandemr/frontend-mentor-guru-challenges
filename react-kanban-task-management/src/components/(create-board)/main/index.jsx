import React, {useState} from "react";
// component
import CreateBoardColumn from "../column";
// Style
import style from "./style.module.css";
// Redux
import {useDispatch, useSelector} from "react-redux";
import {addBoard} from "../../../redux/slices/dataSlice";
import {setCreateBoardIsActive} from "../../../redux/slices/popupsSlice";

export default function CreateBoardMain() {
  const [name, setName] = useState("");
  const [column, setColumn] = useState([]);
  const [createBoardColumnIsActive, setCreateBoardColumnIsActive] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const addBoardButton = () => {
    if (name.trim() !== "" && column.length > 0) {
      const newBoard = {
        name: name,
        columns: column.map((item) => ({name: item, tasks: []})),
      };
      dispatch(addBoard(newBoard));
      dispatch(setCreateBoardIsActive(false));
    } else {
      alert("Error: The board name must not be empty and must contain at least one column.");
    }
  };

  return (
    <>
      <div className={style.background} onClick={() => dispatch(setCreateBoardIsActive(false))}></div>
      <div className={`${style.wrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <h5>Add New Board</h5>

        <h6>Board Name</h6>
        <input type="text" value={name} placeholder="e.g Web Design" onChange={(e) => setName(e.target.value)} />

        <h6>Board Columns</h6>
        {column.length > 0 ? column.map((item, index) => <CreateBoardColumn item={item} key={index} column={column} setColumn={setColumn} />) : <p className={style.noColumnText}>If you haven't added one yet, please add at least one.</p>}

        {createBoardColumnIsActive ? (
          <CreateBoardColumn column={column} setColumn={setColumn} setCreateBoardColumnIsActive={setCreateBoardColumnIsActive} />
        ) : (
          <div className={style.addNewColumnButton} onClick={() => setCreateBoardColumnIsActive(true)}>
            + Add New Column
          </div>
        )}

        <button className={style.createBoardButton} onClick={() => addBoardButton()}>
          Create New Board
        </button>
      </div>
    </>
  );
}
