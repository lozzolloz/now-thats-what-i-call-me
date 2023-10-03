import "./CdCover.css";
import React, { useEffect, useState } from "react";
import '../../fonts/fonts.css'

export default function CdCover({
  theme,
  userName,
  timeRange,
  formattedDate,
  trackLimit,
  topTracks,
}) {
  const [title1, setTitle1] = useState("YES");
  const [title2, setTitle2] = useState("I'D CALL THIS");

  useEffect(() => {
    switch (theme) {
      case "Balloons":
        setTitle1("YES");
        setTitle2("I'D CALL THIS");
        break;
      case "Tropical":
        setTitle1("WELL");
        setTitle2("I THINK THAT'S");
        break;
      case "Bubbles":
        setTitle1("OK");
        setTitle2("THAT'S GIVING");
        break;
      case "Splash":
        setTitle1("SURE");
        setTitle2("IT SOUNDS LIKE");
        break;
      case "Fireworks":
        setTitle1("RIGHT");
        setTitle2("THAT'S CLEARLY");
        break;
      case "Ice":
        setTitle1("ERGO");
        setTitle2("IT MUST BE");
        break;
      default:
        setTitle1("YES");
        setTitle2("I'D CALL THIS");
    }
  }, [theme]);

  return (
    <div id="cd-cover" className="cd-cover">
      <div className="cover-bg">
        <img src={"/" + theme + "-logo.jpeg"} alt="cover-art"></img>
      </div>

      <div className="cover__overlay">
        <div className="title">
          <p id="title1" className={"text--" + theme}>
            {title1}
          </p>
          <p id="title2" className={"text--" + theme + "__highlighted"}>
            {title2}
          </p>
          <p id="title-username" className={"text--" + theme}>
            {userName.toUpperCase()}
          </p>
        </div>

        {trackLimit <= 20 && (
          <div
            id="tracklist"
            className={
              trackLimit === 10
                ? "tracks-ten"
                : trackLimit === 20
                ? "tracks-twenty"
                : ""
            }
          >
            {topTracks.map((track, index) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>
                  <span className="bold">
                    {index + 1}. {index > 8 ? "\u00A0" : "\u00A0\u00A0"}
                    {track.artists[0].name} -
                  </span>{" "}
                  {track.name}
                </p>
              </a>
            ))}
          </div>
        )}

        {trackLimit === 50 && (
          <div id="tracklist" className="tracks-fifty">
            <div className="left-column">
              {topTracks.slice(0, 25).map((track, index) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>
                    <span className="bold">
                      {index + 1}. {index > 8 ? "\u00A0" : "\u00A0\u00A0"}
                      {track.artists[0].name} -
                    </span>{" "}
                    {track.name}
                  </p>
                </a>
              ))}
            </div>
            <div className="right-column">
              {topTracks.slice(25, 50).map((track, index) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>
                    <span className="bold">
                      {index + 26}. {"\u00A0"}
                      {track.artists[0].name} -
                    </span>{" "}
                    {track.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* <div className="cover__overlay--bottom"> */}
        <div className="blurb">
          <div id="slogan" className={"text--" + theme}>
            {timeRange === "short_term" && (
              <p>BIGGEST HITS OF THE LAST MONTH!</p>
            )}
            {timeRange === "medium_term" && <p>HITS FROM THE LAST 6 MONTHS!</p>}
            {timeRange === "long_term" && <p>YOUR ALL-TIME GREATEST HITS!</p>}
          </div>

          <p className="date-and-url">
            Published {formattedDate}&nbsp;nowthatswhatify.netlify.app
          </p>
          {/* </div> */}
          {/* <div className="logo-and-barcode">
<div className="logo-bg">
          <img
            className="spotify-logo"
            src={process.env.PUBLIC_URL + "images/Spotify_Logo_RGB_Black.png"}
            alt="logo"></img></div> */}
          {/* <img
            className="barcode"
            src={process.env.PUBLIC_URL + "images/Barcode.jpg"}
            alt="barcode"
          ></img> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
