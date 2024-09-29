import {useState} from "react";
// Style
import style from "./style.module.css";
// Router DOM
import {Link} from "react-router-dom";
// Logo & Icon
import logo from "../../../assets/images/logo-devlinks-large.svg";
import iconLink from "../../../assets/images/icon-link-copied-to-clipboard.svg";
import PopupText from "../../popup-text";

export default function Preview({isActive}) {
  const [popupIsActive, setPopupIsActive] = useState(false);

  const shareLinkButton = () => {
    navigator.clipboard.writeText(window.location.href);
    setPopupIsActive(true);
    setTimeout(() => {
      setPopupIsActive(false);
    }, 3000);
  };

  return (
    <>
      <div className={style.previewBackground}></div>
      <Link to="/" className={`${isActive && style.backToEditorLink}`}>
        {isActive ? "Back to Editor" : <img src={logo} alt="logo" />}
      </Link>

      <button className={style.shareLinkButton} onClick={shareLinkButton}>
        Share Link
      </button>

      {popupIsActive && <PopupText text={"The link has been copied to your"} icon={iconLink} />}
    </>
  );
}
