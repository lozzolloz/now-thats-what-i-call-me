import "./SaveButton.css";

export default function SaveButton({ onClick }) {
  return (
    <div className="save-button">
      <button onClick={onClick}>Save image</button>
    </div>
  );
}
