import { useEffect } from "react";

import { Row, Col } from "reactstrap";

const About = () => {
  useEffect(() => {
    return () => {
      window.__isAboutLoaded = true;
    };
  });

  const createFadeInClass = () => {
    if (typeof window !== "undefined") {
      return window.__isAboutLoaded ? "" : "fadein";
    }

    return "fadein";
  };

  return (
    <Row className="mt-5 about-page">
      <Col md="6">
        <div className="left-side">
          <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
          <h4 className={`subtitle ${createFadeInClass()}`}>To About Page</h4>
          <p className={`subsubTitle ${createFadeInClass()}`}>
            Feel free to read short description about me.
          </p>
        </div>
      </Col>
      <Col md="6">
        <div className={`${createFadeInClass()}`}>
          <p>My name is Ilan Kanatenko and I am an experienced software . </p>
          <p>
            I have a Bachelor of Science degree in programing and experience
            working on a wide range of technologies and projects in web
            applications
          </p>
          {/* <p>
            Throughout my career, I have acquired advanced technical knowledge
            and the ability to explain programming topics clearly and in detail
            to a broad audience. I invite you to take my course, where I have
            put a lot of effort to explain web and software engineering concepts
            in a detailed, hands-on and understandable way.
          </p> */}
        </div>
      </Col>
    </Row>
  );
};

export default About;
