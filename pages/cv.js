//
import { Row, Col } from "reactstrap";

const Cv = (props) => {
  return (
    <>
      <Row>
        <Col>
          <iframe
            style={{ width: "100%", height: "800px" }}
            src="ilan-kanatenko-resume.pdf"
          />
        </Col>
      </Row>
    </>
  );
};

export default Cv;
