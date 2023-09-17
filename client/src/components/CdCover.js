import "./CdCover.css";

export default function CdCover({
  theme,
  userName,
  timeRange,
  formattedDate,
  trackLimit,
  topTracks,
}) {
  return (
    <div className="cd-cover">
      <div className="cover-bg">
        <img
          src={"/" + theme + ".jpeg"}
          alt="cover-art"
        ></img>
      </div>

<div className="cover__overlay">

      <div className="title">
        <p id="title-now" className={"text--" + theme}>
          NOW
        </p>
        <p id="title-thats" className={"text--" + theme + "__highlighted"}>
          THAT'S WHAT I CALL
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


<div className="cover__overlay--bottom">

      <div className="blurb">
      <div id="slogan" className={"text--" + theme}>
        {timeRange === "short_term" && <p>BIGGEST HITS OF THE LAST MONTH!</p>}
        {timeRange === "medium_term" && <p>HITS FROM THE LAST 6 MONTHS!</p>}
        {timeRange === "long_term" && <p>YOUR ALL-TIME GREATEST HITS!</p>}
      </div>
    
      <p className="date-and-url">
        Published {formattedDate}&nbsp;nowthatswhaticallme.netlify.app
      </p>

      </div>

      <img
        className="barcode"
        src={process.env.PUBLIC_URL + "images/Barcode.jpg"}
        alt="barcode"
      ></img>


</div>
      
    </div>
    </div>
  );
}
