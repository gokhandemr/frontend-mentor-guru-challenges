// Style
import style from "./style.module.css";
// Icon
import showIcon from "../../../assets/icon-show-sidebar.svg";
import hideIcon from "../../../assets/icon-hide-sidebar.svg";
// Redux
import {useDispatch} from "react-redux";
import {setIsActive} from "../../../redux/slices/sidebarSlice";

export default function HideButton({sidebarIsActive}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsActive(!sidebarIsActive));
  };

  return (
    <button onClick={handleClick} className={`${style.button} ${!sidebarIsActive ? style.sidebarInAntive : ""}`}>
      {!sidebarIsActive && <img src={showIcon} alt="show icon" />}
      {sidebarIsActive && (
        <div className={style.hideButton}>
          <img src={hideIcon} alt="hide icon" />
          <p>Hide Sidebar</p>
        </div>
      )}
    </button>
  );
}
