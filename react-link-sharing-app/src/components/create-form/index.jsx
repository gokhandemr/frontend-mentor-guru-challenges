// Icons
import iconName from '../../assets/images/icon-link.svg'
import iconEmail from "../../assets/images/icon-email.svg";
import iconPassword from "../../assets/images/icon-password.svg";
// Style
import style from "./style.module.css";

export default function CreateForm({name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleClick, errorsValue}) {
  return (
    <form onSubmit={handleClick} className={style.formWrapper}>
      <label className={`${errorsValue.errorName ? style.error : ""}`}>Name</label>
      <div className={style.inputContainer}>
        <img src={iconName} alt="icon name" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John" className={`${errorsValue.errorName ? style.error : ""}`} />
        {errorsValue.errorName && <span className={style.errorMessage}>Can’t be empty</span>}
      </div>

      <label className={`${errorsValue.errorEmail ? style.error : ""}`}>Email address</label>
      <div className={style.inputContainer}>
        <img src={iconEmail} alt="icon email" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. alex@email.com" className={`${errorsValue.errorEmail ? style.error : ""}`} />
        {errorsValue.errorEmail && <span className={style.errorMessage}>Can’t be empty</span>}
      </div>

      <label className={`${errorsValue.errorPassword ? style.error : ""}`}>Create password</label>
      <div className={style.inputContainer}>
        <img src={iconPassword} alt="icon password" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className={`${errorsValue.errorPassword ? style.error : ""}`} />
        {errorsValue.errorPassword && <span className={style.errorMessage}>Please check again</span>}
      </div>

      <label>Confirm password</label>
      <div className={style.inputContainer}>
        <img src={iconPassword} alt="icon password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="******" />
      </div>

      <p className={style.passwordInfo}>Password must contain at least 6 characters</p>

      <button type="submit">Create new account</button>
    </form>
  );
}
