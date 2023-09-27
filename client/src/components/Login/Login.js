import "./Login.css";

export default function Login({urlServer}) {

  return (
    <div className="login-screen">
      <div className="title">
        <p id="home-now" className="text--home">
          NOW
        </p>

        <p id="home-thats" className={"text--home__highlighted"}>
          THAT'S WHAT
        </p>

        <p id="home-ify" className="text--home">
          IFY
        </p>
      </div>

      <a className="login-button" href={urlServer}>
        Enter
      </a>
    </div>
  );
}
