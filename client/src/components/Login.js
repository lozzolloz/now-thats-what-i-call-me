import "./Login.css";

export default function Login() {
  return (
    <div className='login-screen'>
      <div className="title">
        <p id="home-now" className="text--home">
          NOW
        </p>
        <div id='poo'>
        <p id="home-thats" className={"text--home__highlighted"}>
          THAT'S WHAT
        </p>
        </div>
        <p id="home-ify" className="text--home">
          IFY
        </p>
      </div>
   
      <a className='login-button' href="http://localhost:8888">Enter</a>
      </div>
  );
}
