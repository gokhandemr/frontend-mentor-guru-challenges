import style from "./style.module.css";

export default function PopupPasswordForm({password, setPassword, setPopupIsActive, handleSaveClick}) {
  return (
    <form className={style.passwordContainer}>
      <h2>Security Authentication</h2>
      <label>Please enter your password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" />
      <div>
        <button type="submit" onClick={handleSaveClick}>
          OK
        </button>
        <button type="button" onClick={() => setPopupIsActive(false)}>
          Close
        </button>
      </div>
    </form>
  );
}
