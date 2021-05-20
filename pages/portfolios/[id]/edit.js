import PortfolioForm from "../../../components/PortfolioForm/PortfolioForm";
import dbConnect from "../../../utils/dbConnect";
import Portfolio from "../../../models/Portfolio";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0/";
import { Row, Col } from "reactstrap";
import axios from "axios";

const EditPortfolio = ({ portfolio, user }) => {
  // console.log(props);
  portfolio.startDate = new Date(portfolio.startDate);
  portfolio.endDate = new Date(portfolio.endDate);

  console.log(user);
  const editPageInDb = (data) => {
    if (user["https://ilanportfolio.com/access"][0] === "admin") {
      console.log("uuuuuuuuuuuuuu", data);
      axios.post("/api/db/editPortfolio", data);
    }
  };

  return (
    <>
      <Row>
        <Col md="8">
          <PortfolioForm initValues={portfolio} onSubmit={editPageInDb} />
        </Col>
      </Row>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    await dbConnect();
    const result = await Portfolio.findById(context.params.id);
    const data = JSON.parse(JSON.stringify(result));
    // const ress = getSession(context.req, context.res);
    // console.log(context.query.id);
    // console.log(result);
    return {
      props: {
        portfolio: data,
      },
    };
  },
});

export default EditPortfolio;
