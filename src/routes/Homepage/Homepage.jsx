import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
// import Meteors from "../ui/Meteors";

const Homepage = () => {
  return (
    <div className="animation">
      <div className="homepage">
        {/* <Meteors /> */}
        <div className="left">
          <h1>CrackGPT</h1>
          <h2>Welcome to one of the most powerful AI of Crack A Level</h2>
          <h3>
            CrackGPT can make mistakes so better to double check your answers!
          </h3>
          <div className="button">
            <Link to="/dashboard">Start Chat!</Link>
          </div>
        </div>
        <div className="right"></div>
        <div className="chat">
          <img src="/logo.png" alt="" />
          <TypeAnimation
            className="typing"
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Hello this is CrackGPT, your personal AI Assistant.",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Hello1!",
              1000,
              "Hello12.",
              1000,
              "Hello123",
              1000,
            ]}
            wrapper="span"
            repeat={Infinity}
            cursor={true}
            // omitDeletionAnimation={true}
          />
        </div>
        <div className="terms">
          <img src="/logo2.png" />
          <div className="links">
            <Link to="/">Terms of Service</Link>
            <span>|</span>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
