import "./Login.css";

export default function Login({urlServer}) {

  return (
    <div className="login-screen">
      <div className="login-screen__title">
        <p id="home-now" className="text--home">
          THAT'S
        </p>

        <p id="home-thats" className={"text--home__highlighted"}>
          THATSWHATIFY
        </p>

        <p id="home-ify" className="text--home">
          WHATIFY
        </p>
      </div>

      <a className="login-button" href={urlServer}>
        Enter
      </a>
    </div>
  );
}
