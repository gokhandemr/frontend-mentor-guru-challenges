import React from "react";
// Logo & Icons
import logo from "../../../assets/images/logo-devlinks-large.svg";
// Style
import style from "./style.module.css";
// Components
import Preview from "../preview";
import Dashboard from "../dashboard";

export default function Header({isPreview, isActive, dashboard, setDashboard, user}) {
  return (
    <header className={`${user ? style.header : ""} ${isPreview ? style.isPreview : ""}`}>
      {user ? isPreview 
      ? <Preview isActive={isActive} user={user} /> 
      : <Dashboard dashboard={dashboard} setDashboard={setDashboard} user={user} /> 
      : <img src={logo} alt="logo" style={{marginBottom: "54px"}} />}
    </header>
  );
}
