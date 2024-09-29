// Style
import style from "./style.module.css";

export default function CustomText({title, desc}) {
  return (
    <>
      <h1 className={style.customTextTitle}>{title}</h1>
      <p className={style.customTextDesc}>{desc}</p>
    </>
  );
}
