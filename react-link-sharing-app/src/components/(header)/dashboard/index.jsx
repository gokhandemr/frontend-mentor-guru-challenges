// Logo & Icons
import logo from "../../../assets/images/logo-devlinks-large.svg";
import smallLogo from "../../../assets/images/logo-devlinks-small.svg";
import linksButtonIcon from "../../../assets/images/icon-links-header.svg";
import profileButtonIcon from "../../../assets/images/icon-profile-details-header.svg";
import previewIcon from "../../../assets/images/icon-preview-header.svg";
// Firebase
import {firebaseSingOut} from "../../../firebase";
// Style
import style from "./style.module.css";
// Router DOM
import {Link} from "react-router-dom";

export default function Dashboard({dashboard, setDashboard, user}) {
  const userProfileURL = `/${user.displayName}.${user.uid[4] + user.uid[2]}`;

  return (
    <>
      <div className={style.logoContainer}>
        <img src={logo} alt="logo" />
        <img src={smallLogo} alt="logo" />
      </div>
      <nav className={style.navBar}>
        <button className={dashboard === "links" ? style.active : ""} onClick={() => setDashboard("links")}>
          <img src={linksButtonIcon} alt="links icon" />
          <span>Links</span>
        </button>
        <button className={dashboard === "details" ? style.active : ""} onClick={() => setDashboard("details")}>
          <img src={profileButtonIcon} alt="profile icon" />
          <span>Profile Details</span>
        </button>
      </nav>
      <div className={style.headerRight}>
        <Link className={style.previewButton} to={userProfileURL}>
          Preview
          <img src={previewIcon} alt="preview link" />
        </Link>
        <button className={style.signOutButton} onClick={() => firebaseSingOut()}>
          Sign out
        </button>
      </div>
    </>
  );
}
