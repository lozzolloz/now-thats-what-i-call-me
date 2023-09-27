import "./Footer.css";

import { urlServer } from "../../App";

export default function Footer() {
  return (
    <div className="footer">
      <a className="logout-button" href={urlServer}>

        Log out
      </a>
    </div>
  );
}
