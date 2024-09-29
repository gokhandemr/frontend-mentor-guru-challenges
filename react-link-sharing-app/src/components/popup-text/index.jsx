// Style
import style from "./style.module.css";

export default function PopupText({text, icon}) {
  return (
    <div className={style.popupTextContainer}>
      {icon && <img src={icon} alt="copied link icon" />}
      {text}
    </div>
  );
}
