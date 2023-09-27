import "./Footer.css";

export default function Footer({urlServer}) {

  return (
    <div className="footer">
      <a className="logout-button" href={urlServer}>
        Log out
      </a>
    </div>
  );
}
