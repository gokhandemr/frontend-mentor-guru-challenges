import React, {useEffect, useState} from "react";
// Router DOM
import {Link, useNavigate} from "react-router-dom";
// Firebase
import {onAuthStateChanged} from "firebase/auth";
import {auth, firebaseLogin} from "../../firebase";
// Components
import Header from "../../components/(header)/main";
import CustomText from "../../components/custom-text";
import LoginForm from "../../components/login-form";
import PopupText from "../../components/popup-text";
// Helmet
import {Helmet} from "react-helmet-async";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [popupText, setPopupText] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filteredEmail = email.trim();
    let filteredPassword = password.trim();

    filteredEmail === "" ? setErrorEmail(true) : setErrorEmail(false);
    filteredPassword === "" ? setErrorPassword(true) : setErrorPassword(false);

    if (filteredEmail !== "" && filteredPassword !== "") {
      const response = await firebaseLogin(filteredEmail, filteredPassword);
      if (response.email) {
        navigate(0);
      } else {
        setPopupText(response);
        setTimeout(() => {
          setPopupText(null);
        }, 3000);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="login-page-wrapper">
        <Header />
        <div>
          <CustomText title={"Login"} desc={"Add your details below to get back into the app"} />
          <LoginForm handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} errorEmail={errorEmail} errorPassword={errorPassword} />
          <p style={{textAlign: "center"}}>
            {`Don’t have an account? `}
            <Link to="/create-user" style={{color: "purple"}}>
              Create account
            </Link>
          </p>
        </div>

        {popupText && <PopupText text={popupText} />}
      </div>
    </>
  );
}
