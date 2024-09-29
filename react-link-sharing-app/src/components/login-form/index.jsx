import React from "react";
// Style
import style from "./style.module.css";
// Icons
import iconEmail from "../../assets/images/icon-email.svg";
import iconPassword from "../../assets/images/icon-password.svg";

export default function LoginForm({handleSubmit, email, setEmail, password, setPassword, errorEmail, errorPassword}) {
  return (
    <form onSubmit={handleSubmit} className={style.formWrapper}>
      <label className={`${errorEmail ? style.error : ""}`}>Email Adress</label>
      <div className={style.inputContainer}>
        <img src={iconEmail} alt="icon email" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. alex@email.com" className={`${errorEmail ? style.error : ""}`} />
        {errorEmail && <span className={style.errorMessage}>Can’t be empty</span>}
      </div>

      <label className={`${errorPassword ? style.error : ""}`}>Password</label>
      <div className={style.inputContainer}>
        <img src={iconPassword} alt="icon password" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className={`${errorPassword ? style.error : ""}`} />
        {errorPassword && <span className={style.errorMessage}>Please check again</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
