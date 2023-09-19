import "./SaveButton.css";

export default function SaveButton({ onClick, theme }) {
  return (
    <div className="save-button">
      <button className={"save-button--"+theme} onClick={onClick}>Save image</button>
    </div>
  );
}
