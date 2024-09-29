import React, {useEffect, useState} from "react";
// Router DOM
import {useNavigate} from "react-router-dom";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth, firebaseGetLinks, firebaseUpdateEmail, firebaseUpdateLink} from "../../firebase";
// Components
import Header from "../../components/(header)/main";
import Mockup from "../../components/mockup";
import LinkControlPanel from "../../components/link-control-panel";
import ProfileControlPanel from "../../components/profile-control-panel";
import SaveButton from "../../components/save-button";
import PopupPasswordForm from "../../components/popup-password-form";
import PopupText from "../../components/popup-text";
// Helmet
import {Helmet} from "react-helmet-async";

export default function HomePage() {
  // Router DOM
  const navigate = useNavigate();
  // Dashboard
  const [dashboard, setDashboard] = useState("links");
  // User details
  const [user, setUser] = useState(null);
  // link-control-panel
  const [links, setLinks] = useState([]);
  // profile-control-panel
  const [photo, setPhoto] = useState("");
  const [firstName, setFirstName] = useState((user && user.displayName) || "");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState((user && user.email) || "");

  // Popup
  const [popupIsActive, setPopupIsActive] = useState(false);
  const [password, setPassword] = useState("");
  const [popupText, setPopupText] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userDomainName = `${user.displayName}.${user.uid[4] + user.uid[2]}`;
        (async () => {
          const response = await firebaseGetLinks(userDomainName);
          if (response) {
            setPhoto(response.photoURL === null ? "" : response.photoURL);
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setEmail(response.email);
            setLinks(response.links);
          }
        })();
      } else {
        navigate("/login");
      }
    });
  }, []);

  // link-control-panel
  const addLink = () => {
    setLinks((prevLinks) => [...prevLinks, {id: Date.now(), platform: "", url: ""}]);
    window.scrollTo(0, document.body.scrollHeight);
  };
  const updateLinkState = (id, newState) => {
    setLinks((prevLinks) => prevLinks.map((link) => (link.id === id ? {...link, ...newState} : link)));
  };
  const deleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id && link));
  };

  // Save button
  const handleConfirmPassword = () => {
    links && links.length > 0
      ? links.some(({url, platform}, index) => {
          if (url === "" || platform === "empty" || platform === "") {
            setPopupText(`Post #${index + 1} is missing a link address or platform`);
            setTimeout(() => {
              setPopupText(null);
            }, 3000);
            setPopupIsActive(false);
            return true;
          }
          return setPopupIsActive(true);
        })
      : setPopupIsActive(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (password !== "") {
      if (email !== "") {
        const response = await firebaseUpdateEmail(user.email, email, password);
        if (response == "ok") {
          const userDocument = `${user.displayName}.${user.uid[4] + user.uid[2]}`;
          const response = await firebaseUpdateLink(userDocument, firstName, lastName, photo, email, links);
          if (response === "ok") {
            setPopupIsActive(false);
            setPopupText("Your account has been successfully updated. The page will be relaunched.");
            setTimeout(() => {
              setPopupText(null);
              navigate(0);
            }, 3000);
          } else {
            setPopupText(response);
            setTimeout(() => {
              setPopupText(null);
            }, 3000);
          }
        } else {
          setPopupText(response);
          setTimeout(() => {
            setPopupText(null);
          }, 3000);
        }
      } else {
        setPopupText("E-mail cannot be empty");
        setTimeout(() => {
          setPopupText(null);
        }, 3000);
      }
    } else {
      setPopupText("Password incorrect");
      setTimeout(() => {
        setPopupText(null);
      }, 3000);
    }
  };

  return (
    user && (
      <>
        <Helmet>
          <title>{`${firstName} ${lastName} Profile`}</title>
        </Helmet>
        <Header dashboard={dashboard} setDashboard={setDashboard} user={user} isActive={true} />
        <div className="dashboard-container">
          <Mockup photo={photo} firstName={firstName} lastName={lastName} email={email} links={links} />
          {user && dashboard === "links" ? (
            <LinkControlPanel links={links} addLink={addLink} updateLinkState={updateLinkState} deleteLink={deleteLink} userId={user.uid} docId={`${user.displayName}.${user.uid[4] + user.uid[2]}`} />
          ) : (
            <ProfileControlPanel photo={photo} setPhoto={setPhoto} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} />
          )}
        </div>
        {popupIsActive && <PopupPasswordForm password={password} setPassword={setPassword} setPopupIsActive={setPopupIsActive} handleSaveClick={handleSaveClick} />}
        {popupText && <PopupText text={popupText} />}
        <SaveButton handleConfirmPassword={handleConfirmPassword} />
      </>
    )
  );
}
