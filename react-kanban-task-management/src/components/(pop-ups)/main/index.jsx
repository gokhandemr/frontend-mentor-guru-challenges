// Redux
import {useSelector} from "react-redux";
// Components
import CreateBoardMain from "../../(create-board)/main";
import EditBoard from "../../(edit-board)/main";
import DeleteBoard from "../../(delete-board)/main";
import AddTask from "../../(add-task)/main";

export default function Popups() {
  const createBoardIsActive = useSelector((state) => state.popups.createBoardIsActive);
  const editBoardIsActive = useSelector((state) => state.popups.editBoardIsActive);
  const deleteButtonIsActive = useSelector((state) => state.popups.deleteButtonIsActive);
  const addTaskIsActive = useSelector((state) => state.popups.addTaskIsActive);

  return (
    <>
      {createBoardIsActive && <CreateBoardMain />}
      {editBoardIsActive && <EditBoard />}
      {deleteButtonIsActive && <DeleteBoard />}
      {addTaskIsActive && <AddTask />}
    </>
  );
}
