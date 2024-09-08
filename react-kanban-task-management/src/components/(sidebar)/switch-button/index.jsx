// Icons
import lightThemeIcon from "../../../assets/icon-light-theme.svg";
import darkThemeIcon from "../../../assets/icon-dark-theme.svg";
// Style
import style from "./style.module.css";
// Redudx
import {useDispatch, useSelector} from "react-redux";
import {setIsActive} from "../../../redux/slices/themeSlice";

export default function SwitchButton() {
  const darkThemeIsActive = useSelector((state) => state.darkTheme.isActive);
  const dispatch = useDispatch();

  return (
    <div className={`${style.switchWrapper} ${darkThemeIsActive ? style.darkTheme : ""}`}>
      <img src={lightThemeIcon} alt="light theme" />

      <div className={style.switch}>
        <label className={style.switch}>
          <input type="checkbox" onClick={() => dispatch(setIsActive(!darkThemeIsActive))} />
          <span className={`${style.slider} ${style.round}`}></span>
        </label>
      </div>

      <img src={darkThemeIcon} alt="dark theme" />
    </div>
  );
}
