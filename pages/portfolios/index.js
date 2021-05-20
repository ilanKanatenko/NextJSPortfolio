//
// import axios from "axios";
import Link from "next/link";
import { useGetPosts } from "../../actions";
import dbConnect from "../../utils/dbConnect";
import Portfolio from "../../models/Portfolio";
import React, { useState } from "react";
import PortfolioCard from "../../components/shared/PortfolioCard";
import { Row, Col, Button } from "reactstrap";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

// const portfolios = [
//   {
//     title: "Job in Netcentric",
//     company: "Netcentric",
//     companyWebsite: "www.google.com",
//     location: "Spain, Barcelona",
//     jobTitle: "Engineer",
//     description: "Doing something, programing....",
//     startDate: "01/01/2014",
//     endDate: "01/01/2016",
//   },
//   {
//     title: "Job in Siemens",
//     company: "Siemens",
//     companyWebsite: "www.google.com",
//     location: "Slovakia, Kosice",
//     jobTitle: "Software Engineer",
//     description: "Responsoble for parsing framework for JSON medical data.",
//     startDate: "01/01/2011",
//     endDate: "01/01/2013",
//   },
//   {
//     title: "Work in USA",
//     company: "WhoKnows",
//     companyWebsite: "www.google.com",
//     location: "USA, Montana",
//     jobTitle: "Housekeeping",
//     description: "So much responsibility....Overloaaaaaad",
//     startDate: "01/01/2010",
//     endDate: "01/01/2011",
//   },
// ];

// new dep
const Portfolios = ({ portfolios: initPortfolios }) => {
  const [portfolios, setPortfolios] = useState(initPortfolios);
  const router = useRouter();
  const { user } = useUser();
  // const { data, error, loading } = useGetPosts();
  // const renderPosts = () => {
  //   return data.map((post) => {
  //     return (
  //       <li key={post.id}>
  //         <Link href={`/portfolios/${post.id}`}>{post.title}</Link>
  //       </li>
  //     );
  //   });
  // };

  // const renderPortfolios = () => {
  //   return props.portfolios.map((portfolio) => {
  //     return (
  //       <li key={portfolio._id}>
  //         <Link href={`/portfolios/${portfolio._id}`}>{portfolio.title}</Link>
  //       </li>
  //     );
  //   });
  // };

  return (
    <>
      {/* {loading && <p>Loading Data ...</p>} */}
      {/* {true && <ul>{renderPortfolios()}</ul>} */}
      {/* {error && <div className="alert alert-danger">{error.message}</div>} */}
      <Row>
        {portfolios.map((portfolio) => (
          <Col
            key={portfolio._id}
            onClick={() => router.push(`/portfolios/${portfolio._id}`)}
            md="4"
          >
            <PortfolioCard portfolio={portfolio}>
              {user && user["https://ilanportfolio.com/access"][0] === "admin" && (
                <React.Fragment>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/portfolios/${portfolio._id}/edit`);
                    }}
                    className="me-2"
                    color="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={async (e) => {
                      e.stopPropagation();
                      const res = await axios.delete(
                        "/api/db/deletePortfolio",
                        {
                          data: {
                            _id: portfolio._id,
                          },
                        }
                      );
                      const updatedPortfolios = portfolios.filter(
                        (portfolioIt) => portfolioIt._id !== portfolio._id
                      );
                      setPortfolios(updatedPortfolios);
                      console.log(res);
                      // router.push(`/portfolios/${portfolio._id}/edit`);
                    }}
                    color="danger"
                  >
                    Delete
                  </Button>
                </React.Fragment>
              )}
            </PortfolioCard>
          </Col>
        ))}
      </Row>
    </>
  );
};
// getStaticProps;
//getServerSideProps
export async function getStaticProps() {
  await dbConnect();
  /* find all the data in our database */

  // const portfolio1 = new Portfolio({ name: "Silence" });

  // await portfolio1.save();

  const result = await Portfolio.find({});
  const data = JSON.parse(JSON.stringify(result));

  // const temp = new Portfolio({
  //   title: "Job in Siemens",
  //   company: "Siemens",
  //   companyWebsite: "www.google.com",
  //   location: "Slovakia, Kosice",
  //   jobTitle: "Software Engineer",
  //   description: "Responsoble for parsing framework for JSON medical data.",
  //   startDate: "01/01/2011",
  //   endDate: "01/01/2013",
  // });
  // const res = await temp.save();

  // const portfolios = result.map((doc) => {
  //   const pet = doc.toObject();
  //   pet._id = pet._id.toString();
  //   return pet;
  // });

  return { props: { portfolios: data }, revalidate: 1 };
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   let posts = [];
//   try {
//     const res = await axios("https://jsonplaceholder.typicode.com/posts");
//     posts = res.data;
//   } catch (e) {
//     console.error(e);
//   }

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts: posts.slice(0, 10),
//     },
//   };
// }

export default Portfolios;
