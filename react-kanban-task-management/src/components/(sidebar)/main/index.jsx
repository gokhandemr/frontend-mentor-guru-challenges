// Logos
import darkLogo from "../../../assets/logo-dark.svg";
import lightLogo from "../../../assets/logo-light.svg";
// Style
import style from "./style.module.css";
// Redux
import {useSelector} from "react-redux";
// Components
import BoardsMenu from "../boards-menu";
import HideButton from "../hide-button";
import SwitchButton from "../switch-button";

export default function Sidebar() {
  const sidebarIsActive = useSelector((state) => state.sidebar.isActive);
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);

  const closeMobileSidebar = () => {
    const asideElement = document.querySelector("aside");
    asideElement.style.display = "none";
    const mobileBackground = document.querySelector(".mobile-background");
    mobileBackground.style.display = "none";
  };

  return (
    <>
      <div className={`${style.mobileBackground} mobile-background`} onClick={() => closeMobileSidebar()}></div>
      <aside className={`${style.wrapper} ${!sidebarIsActive ? style.hide : ""} ${darkThemeIsActive ? style.darkTheme : ""}`}>
        <div>
          <div className={style.logo}>
            <img src={darkThemeIsActive ? lightLogo : darkLogo} alt="kanban logo" />
          </div>

          <BoardsMenu />
        </div>

        <div>
          <SwitchButton />
          <HideButton sidebarIsActive={sidebarIsActive} />
        </div>
      </aside>
    </>
  );
}
