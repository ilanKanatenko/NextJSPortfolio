// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Typed from "react-typed";

export default function Home() {
  const roles = [
    "Full Stack Developer",
    "Next JS",
    "React JS",
    "Redux",
    "Node JS",
  ];

  const str = `.cover {
    background-image: linear-gradient(
      45deg,
      rgb(254, 202, 83),
      rgb(253, 157, 97)
    );`;

  const [isFlipping, setIsFlipping] = useState(false);
  const flipInterval = useRef();

  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((prevFlipping) => !prevFlipping);
    }, 20000);
  };

  return (
    <div className="main-section">
      <div className="background-image">
        <img src="/images/background-index.png" />
      </div>
      <Container>
        <Row>
          <Col md="6">
            <div className="hero-section">
              <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                <div className="front">
                  <div className="hero-section-content">
                    <h2> Full Stack Web Developer </h2>
                    <div className="hero-section-content-intro">
                      Have a look at my portfolio and job history.
                    </div>
                  </div>
                  <img className="image" src="/images/section-1.png" />
                  <div className="shadow-custom">
                    <div className="shadow-inner"> </div>
                  </div>
                </div>
                <div className="back">
                  <div className="hero-section-content">
                    <h2> Full Stack Web Developer </h2>
                    <div className="hero-section-content-intro">
                      Have a look at my portfolio and job history.
                    </div>
                  </div>
                  <img className="image" src="/images/section-2.png" />
                  <div className="shadow-custom shadow-custom-orange">
                    <div className="shadow-inner"> </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" className="hero-welcome-wrapper">
            <div className="hero-welcome-text">
              <h1>
                Welcome to the portfolio website of Filip Jerga. Get informed,
                collaborate and discover projects I was working on through the
                years!
              </h1>
            </div>
            <Typed
              loop
              typeSpeed={70}
              backSpeed={70}
              strings={roles}
              backDelay={1000}
              loopCount={0}
              showCursor
              className="self-typed"
              cursorChar="|"
            />
            <div className="hero-welcome-bio">
              <h1>Let's take a look on my work.</h1>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx global>
        {`
          .port-navbar.port-default.with-bg {
            background-color: transparent;
          }
          .base-page {
            background-color: transparent;
          }
          .cover {
            background-image: ${isFlipping
              ? "linear-gradient(45deg, rgb(254, 202, 83), rgb(253, 157, 97))"
              : "linear-gradient(45deg, #00aeef 0%, #096fb9 100%)"};
          }
          .port-navbar.port-default.with-bg.is-open {
            background-color: #2c3e50;
          }
          .port-navbar.port-default.with-bg.is-close {
            transition: 1s;
          }
        `}
      </style>
    </div>
  );
}

// (
//   45deg,
//   rgb(254, 202, 83),
//   rgb(253, 157, 97)
// );
