import React, {useEffect, useState} from "react";
// Router DOM
import {useNavigate, useParams} from "react-router-dom";
// Firebase
import {auth, firebaseGetLinks} from "../../firebase";
import {onAuthStateChanged} from "firebase/auth";
// Components
import Header from "../../components/(header)/main";
import Mockup from "../../components/mockup";
// Helmet
import {Helmet} from "react-helmet-async";

export default function UserPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && setIsActive(true);
    });

    (async () => {
      const response = await firebaseGetLinks(params.user);
      if (response && response.uid) {
        setUser(response);
      } else {
        navigate("*");
      }
    })();
  }, []);

  const userPageContainer = {minHeight: "calc(100vh - 48px)", display: "flex", flexDirection: "column"};

  return (
    user && (
      <>
        <Helmet>
          <title>{`${user.firstName} ${user.lastName}`}</title>
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <div style={userPageContainer}>
          <Header user={user} isPreview={true} isActive={isActive} />
          <main>
            <Mockup isPreview={true} photo={user.photoURL} firstName={user.firstName} lastName={user.lastName} email={user.email} links={user.links} />
          </main>
        </div>
      </>
    )
  );
}
