import "./OptionsSelect.css"

export default function OptionsSelect({
  trackLimit,
  trackLimits,
  setTrackLimit,
  timeRange,
  timeRanges,
  setTimeRange,
  theme,
  themes1,
  themes2,
  setTheme,
}) {
  return(
  <div className="options">
    <div className="options__section">
      <p>Number of tracks</p>
      <div className="limit-buttons">
        {trackLimits.map((limit) => (
          <button
            className={trackLimit === limit.limit ? "options--selected" : ""}
            onClick={() => setTrackLimit(limit.limit)}
          >
            {limit.alias}
          </button>
        ))}
      </div>
    </div>
    <div className="options__section">
      <p>Time range</p>
      <div className="range-buttons">
        {timeRanges.map((range) => (
          <button
            className={timeRange === range.range ? "options--selected" : ""}
            onClick={() => setTimeRange(range.range)}
          >
            {range.alias}
          </button>
        ))}
      </div>
    </div>
    <div className="options__section">
      <p>Theme</p>
      <div className="theme-buttons">
        {themes1.map((selectedTheme) => (
          <button
            className={theme === selectedTheme ? "options--selected" : ""}
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
    </div>)}
