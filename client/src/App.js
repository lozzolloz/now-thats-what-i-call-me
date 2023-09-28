import "./App.css";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import html2canvas from "html2canvas";
import Login from "./components/Login/Login";
import OptionsSelect from "./components/OptionsSelect/OptionsSelect";
import CdCover from "./components/CdCover/CdCover";
import Footer from "./components/Footer/Footer";
import SaveButton from "./components/SaveButton/SaveButton";

//change to false when working locally
let deployment = false;
var urlServer =
  deployment === true
    ? "https://nowthatswhatify.up.railway.app"
    : "http://localhost:8888";

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
  const [theme, setTheme] = useState("Balloons");
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
    { value: 10, alias: "10 tracks" },
    { value: 20, alias: "20 tracks" },
    { value: 50, alias: "50 tracks" },
  ];
  const timeRanges = [
    { value: "short_term", alias: "1 month" },
    { value: "medium_term", alias: "6 months" },
    { value: "long_term", alias: "All time" },
  ];
  const themes = [
    { value: "Balloons", alias: "Balloons" },
    { value: "Tropical", alias: "Tropical" },
    { value: "Bubbles", alias: "Bubbles" },
    { value: "Splash", alias: "Splash" },
    { value: "Fireworks", alias: "Fireworks" },
    { value: "Ice", alias: "Ice" },
  ];

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

  const captureScreenshot = () => {
    const elementToCapture = document.getElementById("cd-cover");
    if (elementToCapture) {
      html2canvas(elementToCapture).then(function (canvas) {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL("image/png");

        // Create a temporary anchor element to download the image
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "nowthatswhatify.png"; // Set the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
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
    <>
      {!loggedIn && (
        <div>
          <Login urlServer={urlServer} />
        </div>
      )}
      {loggedIn && (
        <div className="App">
          <OptionsSelect
            trackLimit={trackLimit}
            trackLimits={trackLimits}
            setTrackLimit={setTrackLimit}
            timeRange={timeRange}
            timeRanges={timeRanges}
            setTimeRange={setTimeRange}
            theme={theme}
            themes={themes}
            setTheme={setTheme}
          />

          <CdCover
            topTracks={topTracks}
            trackLimit={trackLimit}
            timeRange={timeRange}
            theme={theme}
            formattedDate={formattedDate}
            userName={userName}
          />
          <SaveButton onClick={captureScreenshot} theme={theme} />
          <Footer urlServer={urlServer} />
        </div>
      )}
    </>
  );
}
export default App;
