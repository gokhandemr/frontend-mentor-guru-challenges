// Style
import style from "./style.module.css";

export default function SaveButton({handleConfirmPassword}) {
  return (
    <div className={style.saveButtonContainer}>
      <button className={style.button} onClick={() => handleConfirmPassword()}>
        Save
      </button>
    </div>
  );
}
