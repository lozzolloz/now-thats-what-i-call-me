import "./OptionsSelect.css"
import Options from "./Options/Options"

export default function OptionsSelect({trackLimits, setTrackLimit, trackLimit, timeRanges, setTimeRange, timeRange, themes, setTheme, theme
}) {
  return(<div className="options-select"><Options
    optionTitle="Number of tracks"
    optionOptions={trackLimits}
    setOption={setTrackLimit}
    optionCurrent={trackLimit}
  />

  <Options
    optionTitle="Time range"
    optionOptions={timeRanges}
    setOption={setTimeRange}
    optionCurrent={timeRange}
  />

  <Options
    optionTitle="Theme"
    optionOptions={themes}
    setOption={setTheme}
    optionCurrent={theme}
  /></div>)}