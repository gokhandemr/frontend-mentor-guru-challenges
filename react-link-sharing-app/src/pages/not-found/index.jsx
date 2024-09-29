import React from "react";
// Component
import CustomText from "../../components/custom-text";
// Router DOM
import {useNavigate} from "react-router-dom";
// Helmet
import {Helmet} from "react-helmet-async";

export default function NotFound() {
  const navigate = useNavigate();
  const containerStyle = {
    display: "flex",
    padding: "40px",
    flexDirection: "column",
    alignItems: "center",
    height: "calc(100vh - 80px)",
    justifyContent: "center",
  };
  const button = {
    padding: "12px 24px",
    background: "var(--purple)",
    color: "var(--white)",
    border: "none",
  };
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div style={containerStyle}>
        <CustomText title={"404"} desc={"Oops! The page you're looking for doesn't exist."} />
        <button style={button} onClick={() => navigate("/")}>
          Go to HomePage
        </button>
      </div>
    </>
  );
}
