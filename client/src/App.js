import "./App.css";
import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Login from "./components/Login";
import OptionsSelect from "./components/OptionsSelect";
import CdCover from "./components/CdCover";
import Footer from "./components/Footer";

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
    { limit: 10, alias: "10 tracks" },
    { limit: 20, alias: "20 tracks" },
    { limit: 50, alias: "50 tracks" },
  ];
  const timeRanges = [
    { range: "short_term", alias: "1 month" },
    { range: "medium_term", alias: "6 months" },
    { range: "long_term", alias: "All time" },
  ];
  const themes1 = ["Balloons", "Tropical", "Bubbles"];
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
    <>
      {!loggedIn && (
        <div className="App">
          <Login />
        </div>
      )}
      {loggedIn && (
        <div className="App">
          <OptionsSelect
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            trackLimit={trackLimit}
            setTrackLimit={setTrackLimit}
            theme={theme}
            setTheme={setTheme}
            trackLimits={trackLimits}
            timeRanges={timeRanges}
            themes1={themes1}
            themes2={themes2}
          />
          <CdCover
            topTracks={topTracks}
            trackLimit={trackLimit}
            timeRange={timeRange}
            theme={theme}
            formattedDate={formattedDate}
            userName={userName}
          />
          <Footer />
        </div>
      )}
    </>
  );
}
export default App;
