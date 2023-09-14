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
      });
      setLoggedIn(true);
    }
  });

  const getMyTopTracks = (trackLimit, timeRange) => {
    spotifyApi
      .getMyTopTracks({ limit: trackLimit, time_range: timeRange })
      .then((response) => {
        console.log(response.items);
        setTopTracks(response.items);
      });
  };

  useEffect(() => {
    getMyTopTracks(trackLimit, timeRange);
  }, [trackLimit, timeRange]);

  useEffect(() => {
    console.log("This is our top tracks: ", topTracks);
  }, [topTracks]);

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888">Log in to Spotify</a>}
      {loggedIn && (
        <>
          <button
            className={trackLimit === 10 ? "selected" : ""}
            onClick={() => setTrackLimit(10)}
          >
            10 tracks
          </button>
          <button
            className={trackLimit === 20 ? "selected" : ""}
            onClick={() => setTrackLimit(20)}
          >
            20 tracks
          </button>
          <button
            className={trackLimit === 50 ? "selected" : ""}
            onClick={() => setTrackLimit(50)}
          >
            50 tracks
          </button>
          <button
            className={timeRange === "short_term" ? "selected" : ""}
            onClick={() => setTimeRange("short_term")}
          >
            1 month
          </button>
          <button
            className={timeRange === "medium_term" ? "selected" : ""}
            onClick={() => setTimeRange("medium_term")}
          >
            6 months
          </button>
          <button
            className={timeRange === "long_term" ? "selected" : ""}
            onClick={() => setTimeRange("long_term")}
          >
            All time
          </button>
        </>
      )}
      {loggedIn && (
        <div
          id="tracklist"
          className={
            trackLimit === 10
              ? "tracks-ten"
              : trackLimit === 20
              ? "selected-twenty"
              : trackLimit === 50
              ? "selected-fifty"
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
    </div>
  );
}
export default App;
