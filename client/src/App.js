import "./App.css";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [topTracks, setTopTracks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [trackLimit, setTrackLimit] = useState(10);
  const [timeRange, setTimeRange] = useState("short_term");
  const [theme, setTheme] = useState("Tropical");
  const [userName, setUserName] = useState("");

  const today = new Date();
  const day = today.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  const trackLimits = [
    { limit: 10, alias: "10 tracks" },
    { limit: 20, alias: "20 tracks" },
    { limit: 50, alias: "50 tracks" },
  ];
  const timeRanges = [
    { range: "short_term", alias: "1 month" },
    { range: "medium_term", alias: "6 months" },
    { range: "long_term", alias: "All time" },
  ];
  const themes1 = ["Tropical", "Bubbles", "Balloons"];
  const themes2 = ["Splash", "Fireworks", "Ice"];

  useEffect(() => {
    console.log("This is what we derived from the URL: ", getTokenFromUrl());
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";
    console.log("This is our Spotify token", spotifyToken);

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        console.log("This is our user: ", user);
        setUserName(user.display_name);
      });
      setLoggedIn(true);
    }
  }, []);

  const getMyTopTracks = (trackLimit, timeRange) => {
    spotifyApi
      .getMyTopTracks({ limit: trackLimit, time_range: timeRange })
      .then((response) => {
        console.log(response.items);
        setTopTracks(response.items);
      });
  };

  useEffect(() => {
    if (spotifyToken) {
      getMyTopTracks(trackLimit, timeRange);
    }
  }, [trackLimit, timeRange, spotifyToken]);

  useEffect(() => {
    console.log("This is our top tracks: ", topTracks);
  }, [topTracks]);

  useEffect(() => {
    console.log("This is our theme: ", theme);
  }, [theme]);

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888">Log in to Spotify</a>}
      {loggedIn && (
        <div className="options">
          <p>Number of tracks</p>
          <div className="limit-buttons">
            {trackLimits.map((limit) => (
              <button
                className={trackLimit === limit.limit ? "selected" : ""}
                onClick={() => setTrackLimit(limit.limit)}
              >
                {limit.alias}
              </button>
            ))}
          </div>
          <p>Time range</p>
          <div className="range-buttons">
            {timeRanges.map((range) => (
              <button
                className={timeRange === range.range ? "selected" : ""}
                onClick={() => setTimeRange(range.range)}
              >
                {range.alias}
              </button>
            ))}
          </div>
          <p>Theme</p>
          <div className="theme-buttons">
            {themes1.map((selectedTheme) => (
              <button
                className={theme === selectedTheme ? "selected" : ""}
                onClick={() => setTheme(selectedTheme)}
              >
                {selectedTheme}
              </button>
            ))}
            <br />
            {themes2.map((selectedTheme) => (
              <button
                className={theme === selectedTheme ? "selected" : ""}
                onClick={() => setTheme(selectedTheme)}
              >
                {selectedTheme}
              </button>
            ))}
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="results">
          <div className="cover-art">
            <img
              src={process.env.PUBLIC_URL + "/images/" + theme + ".jpeg"}
              alt="cover-art"
            ></img>
          </div>

          <div className="title">
            <p className="title-now">NOW</p>
            <p className="title-thats">THAT'S WHAT I CALL</p>
            <p className="title-username">{userName.toUpperCase()}</p>
          </div>

          <div className="slogan">
            {timeRange === "short_term" && (
              <p className="slogan">BIGGEST HITS OF THE LAST MONTH!</p>
            )}
            {timeRange === "medium_term" && (
              <p className="slogan">HITS FROM THE LAST 6 MONTHS!</p>
            )}
            {timeRange === "long_term" && (
              <p className="slogan">YOUR ALL-TIME GREATEST HITS!</p>
            )}
          </div>

          <img
            className="barcode"
            src={process.env.PUBLIC_URL + "images/Barcode.jpg"}
            alt="barcode"
          ></img>

          <p className="date-and-url">
            Published {formattedDate}&nbsp;nowthatswhaticallme.netlify.app
          </p>

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
                <p key={track.id}>
                  <span className="bold">
                    {index + 1}. {index > 8 ? "\u00A0" : "\u00A0\u00A0"}
                    {track.artists[0].name} -
                  </span>{" "}
                  {track.name}
                </p>
              ))}
            </div>
          )}

          {trackLimit === 50 && (
            <div id="tracklist" className="tracks-fifty">
              <div className="left-column">
                {topTracks.slice(0, 25).map((track, index) => (
                  <p key={track.id}>
                    <span className="bold">
                      {index + 1}. {index > 8 ? "\u00A0" : "\u00A0\u00A0"}
                      {track.artists[0].name} -
                    </span>{" "}
                    {track.name}
                  </p>
                ))}
              </div>
              <div className="right-column">
                {topTracks.slice(25, 50).map((track, index) => (
                  <p key={track.id}>
                    <span className="bold">
                      {index + 26}. {"\u00A0"}
                      {track.artists[0].name} -
                    </span>{" "}
                    {track.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default App;
