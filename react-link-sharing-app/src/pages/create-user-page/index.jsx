import React, {useEffect, useState} from "react";
// Router DOM
import {Link, useNavigate} from "react-router-dom";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth, firebaseRegister} from "../../firebase";
// Components
import Header from "../../components/(header)/main";
import CustomText from "../../components/custom-text";
import CreateForm from "../../components/create-form";
import PopupText from "../../components/popup-text";
// Helmet
import {Helmet} from "react-helmet-async";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [popupText, setPopupText] = useState(null);

  let errorsValue = {errorName, errorEmail, errorPassword};

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    let filteredName = name.trim().replace(/[^a-zA-Z0-9]/g, "");
    let filteredEmail = email.trim();
    let filteredPassword = password.trim();
    let filteredConfirmPassword = confirmPassword.trim();

    filteredName === "" ? setErrorName(true) : setErrorName(false);
    filteredEmail === "" ? setErrorEmail(true) : setErrorEmail(false);
    // filteredPassword === "" ? setErrorPassword(true) : setErrorPassword(false);
    filteredPassword !== filteredConfirmPassword || filteredPassword === "" ? setErrorPassword(true) : setErrorPassword(false);

    if (filteredName !== "" && filteredEmail !== "" && filteredPassword !== "" && filteredConfirmPassword !== "") {
      if (filteredPassword === filteredConfirmPassword) {
        const response = await firebaseRegister(filteredName, filteredEmail, filteredPassword);
        if (response === "ok") {
          navigate(0);
        } else {
          setPopupText(response);
          setTimeout(() => {
            setPopupText(null);
          }, 3000);
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Create User Page</title>
      </Helmet>

      <div className="create-page-wrapper">
        <Header />
        <div>
          <CustomText title={"Create account"} desc={"Let’s get you started sharing your links!"} />
          <CreateForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleClick={handleClick}
            errorsValue={errorsValue}
          />
          <p style={{textAlign: "center"}}>
            {`Already have an account? `}
            <Link to="/login" style={{color: "purple"}}>
              Login
            </Link>
          </p>
        </div>
        {popupText && <PopupText text={popupText} />}
      </div>
    </>
  );
}
