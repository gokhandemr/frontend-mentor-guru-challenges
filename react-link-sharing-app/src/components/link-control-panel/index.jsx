// Style
import style from "./style.module.css";
// Components
import Link from "../link";
import CustomText from "../custom-text";
// icon
import iconEmpty from "../../assets/images/illustration-empty.svg";

export default function LinkControlPanel({links, addLink, updateLinkState, deleteLink}) {
  return (
    <div className={style.linkControlPanelContainer}>
      <CustomText title={"Customize your links"} desc={"Add/edit/remove links below and then share all your profiles with the world!"} />
      <button className={style.addNewLinkButton} onClick={addLink}>
        + Add New Link
      </button>
      {links && links.length > 0 ? (
        links.map((link, index) => <Link key={link.id} number={index} id={link.id} linkState={link} updateLinkState={updateLinkState} deleteLink={deleteLink} />)
      ) : (
        <div className={style.emptyContainer}>
          <img src={iconEmpty} alt="empty icon" />
          <CustomText title={"Let’s get you started"} desc={"Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"} />
        </div>
      )}
    </div>
  );
}
