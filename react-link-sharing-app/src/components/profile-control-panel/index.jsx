// Style
import style from "./style.module.css";
// Components
import CustomText from "../custom-text";

export default function ProfileControlPanel({photo, setPhoto, firstName, setFirstName, lastName, setLastName, email, setEmail}) {
  return (
    <div className={style.profilePanelContaier}>
      <CustomText title={"Profile Details"} desc={"Add your details to create a personal touch to your profile."} />
      <div className={style.imageContainer}>
        <label>Profile picture</label>
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Enter the URL of your profile photo.." />
      </div>

      <div className={style.detailsContainer}>
        <div>
          <label>First Name*</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="e.g. John" />
        </div>
        <div>
          <label>Last Name*</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="e.g. Wick" />
        </div>
        <div>
          <label>Email*</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. email@example.com" />
        </div>
      </div>
    </div>
  );
}
