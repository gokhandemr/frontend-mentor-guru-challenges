import React, {useEffect, useState} from "react";
// Style
import style from "./style.module.css";
// Icon
import linkIcon from "../../assets/images/icon-drag-and-drop.svg";

export default function Link({number, id, linkState, updateLinkState, deleteLink}) {
  const [platform, setPlatform] = useState(linkState.platform || "empty");
  const [url, setUrl] = useState(linkState.url || "");
  const [urlError, setUrlError] = useState(false);
  const [platformError, setPlatformError] = useState(false);

  useEffect(() => {
    let filteredUrl = url.trim();
    filteredUrl.length <= 0 ? setUrlError(true) : updateLinkState(id, {platform: platform, url: filteredUrl}, setUrlError(false));
    platform === "empty" ? setPlatformError(true) : updateLinkState(id, {platform: platform, url: filteredUrl}, setPlatformError(false));
  }, [platform, url]);

  const platforms = ["empty", "codepen", "codewars", "devto", "facebook", "freecodecamp", "frontend-mentor", "github", "gitlab", "stack-overflow", "linkedin", "twitch", "twitter", "youtube"];

  return (
    <div className={style.linkContainer}>
      <div className={style.linkTop}>
        <div>
          <img src={linkIcon} alt="link icon" />
          <p className={style.linkCount}>Link #{number + 1}</p>
        </div>
        <button className={style.removeLinkButton} onClick={() => deleteLink(id)}>
          Remove
        </button>
      </div>
      <label>Platform</label>

      <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={`${platformError ? style.error : ""}`}>
        {platforms.map((platform, index) => (
          <option key={index} value={platform}>
            {platform}
          </option>
        ))}
      </select>

      <label>Link</label>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. https://www.github.com/johnappleseed" className={`${urlError ? style.error : ""}`} />
    </div>
  );
}
