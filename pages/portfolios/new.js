//
// import { getSession } from "@auth0/nextjs-auth0";

import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import PortfolioForm from "../../components/PortfolioForm/PortfolioForm";

const PortfolioNew = (props) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading) {
      if (user && user["https://ilanportfolio.com/access"][0] === "admin") {
        return;
      } else {
        router.push("/");
      }
    }
  }, [isLoading]);
  // if (user) {
  //   // isAdmin = user["https://ilanportfolio.com/access"][0] === "admin";
  //   if (user["https://ilanportfolio.com/access"][0] === "admin") {
  //     setIsAdmin("true");
  //   }
  // }

  const createPortfolio = async (data) => {
    const res = await axios.post("/api/db/newPortfolio", data);
    router.push("/portfolios");
    // alert(data);
  };

  return (
    <>
      {user && (
        <Row>
          <Col md="8">
            <PortfolioForm onSubmit={createPortfolio} />
          </Col>
        </Row>
      )}
    </>
  );
};

// export async function getServerSideProps(context) {
//   //get users auth session
//   const { user } = await getSession(context.req, context.res);
//   const userPrivilege = user["https://ilanportfolio.com/access"][0];

//   const isAdmin = userPrivilege === "admin";
//   console.log(isAdmin);
//   const result = isAdmin
//     ? {
//         props: {
//           portfolio: "data",
//         },
//       }
//     : {
//         props: {
//           portfolio: "data",
//         },
//         redirect: {
//           destination: "/",
//           permanent: false,
//         },
//       };

//   return result;
// }

export default PortfolioNew;
