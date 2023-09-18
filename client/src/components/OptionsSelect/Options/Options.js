import "./Options.css"

export default function Options({
optionTitle,
optionOptions,
setOption,
optionCurrent
}) {
  return( <div className="options__section">
      <p>{optionTitle}</p>
      <div className="options__buttons">
        {optionOptions.map((item) => (
          <button
            className={optionCurrent === item.value ? "options--selected" : ""}
            onClick={() => {setOption(item.value)}}
          >
            {item.alias}
          </button>
        ))}</div></div>)}
