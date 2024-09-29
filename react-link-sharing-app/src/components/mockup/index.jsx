// Mockup
import mockup from "../../assets/images/illustration-phone-mockup.svg";
// Style
import style from "./style.module.css";
// Router DOM
import {Link} from "react-router-dom";
// Platform Icons
import githubIcon from "../../assets/images/icon-github.svg";
import linkedinIcon from "../../assets/images/icon-linkedin.svg";
import facebookIcon from "../../assets/images/icon-facebook.svg";
import youtubeIcon from "../../assets/images/icon-youtube.svg";
import codepenIcon from "../../assets/images/icon-codepen.svg";
import codewarsIcon from "../../assets/images/icon-codewars.svg";
import devtoIcon from "../../assets/images/icon-devto.svg";
import freecodecampIcon from "../../assets/images/icon-freecodecamp.svg";
import frontendMentorIcon from "../../assets/images/icon-frontend-mentor.svg";
import gitlabIcon from "../../assets/images/icon-gitlab.svg";
import stackOverflowIcon from "../../assets/images/icon-stack-overflow.svg";
import twitchIcon from "../../assets/images/icon-twitch.svg";
import twitterIcon from "../../assets/images/icon-twitter.svg";
import arrow from "../../assets/images/icon-arrow-right.svg";

export default function Mockup({isPreview, photo, firstName, lastName, email, links}) {
  const platforms = [
    {name: "empty", icon: null},
    {name: "codepen", icon: codepenIcon},
    {name: "codewars", icon: codewarsIcon},
    {name: "devto", icon: devtoIcon},
    {name: "facebook", icon: facebookIcon},
    {name: "freecodecamp", icon: freecodecampIcon},
    {name: "frontend-mentor", icon: frontendMentorIcon},
    {name: "github", icon: githubIcon},
    {name: "gitlab", icon: gitlabIcon},
    {name: "stack-overflow", icon: stackOverflowIcon},
    {name: "linkedin", icon: linkedinIcon},
    {name: "twitch", icon: twitchIcon},
    {name: "twitter", icon: twitterIcon},
    {name: "youtube", icon: youtubeIcon},
  ];

  return (
    <div className={`${style.mockupContainer} ${isPreview ? style.isPreview : ""}`}>
      <div>
        <img src={mockup} alt="mockup" className={style.mockupContainerImg} />
        <div className={style.mockupUserDetails}>
          {photo && <img src={photo} alt={firstName} />}

          {(firstName || lastName) && <h1>{`${firstName} ${lastName}`}</h1>}
          {email && <h2>{email}</h2>}
        </div>
    
        {links && links.length > 0 && (
          <div className={`${style.mockupContainerLinkList} ${links.length > 4 ? style.scroll : ""}`}>
            {links.map((link) => (
              <Link key={link.id} className={`${style.mockupContainerLink} ${style[link.platform]}`} to={link.url} target="_blank">
                <h3>
                  {platforms.map((platform, index) => platform.name !== "empty" && platform.name === link.platform && link.platform && <img key={index} src={platform.icon} alt="platform image" className={style.mockupContainerLinkImg} />)}
                  {link.platform !== "empty" && link.platform}
                </h3>
                <img src={arrow} alt="icon" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
