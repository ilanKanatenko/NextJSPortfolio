import { useRouter } from "next/router";
import axios from "axios";
import { useGetPostById } from "../../../actions";

import dbConnect from "../../../utils/dbConnect";
import Portfolio from "../../../models/Portfolio";

const PortfolioById = ({ portfolio }) => {
  console.log(portfolio);
  return <h1>{portfolio.title}</h1>;
  // const router = useRouter();
  // const { data: portfolio, error, loading } = useGetPostById(router.query.id);
  // return (
  //   <>
  //     {loading && <p>Loading Data ...</p>}
  //     {error && <div className="alert alert-danger">{error.message}</div>}
  //     {portfolio && (
  //       <>
  //         {" "}
  //         <h1> {portfolio.title}</h1>
  //         <p>{portfolio.body}</p>
  //         <p>{portfolio.id}</p>{" "}
  //       </>
  //     )}
  //   </>
  // );
};

export async function getStaticPaths() {
  await dbConnect();

  const result = await Portfolio.find({});

  const authorizedPaths = result.map((portfolio) => {
    return { params: { id: portfolio._id + "" } };
  });
  console.log(authorizedPaths);

  return {
    paths: authorizedPaths,
    fallback: false,
  };
}

//fallback: "blocking",

export async function getStaticProps(context) {
  await dbConnect();
  const result = await Portfolio.findById(context.params.id);
  console.log(result);
  const data = JSON.parse(JSON.stringify(result));
  // const redirectTemp = result
  //   ? {
  //       destination: "/",
  //       permanent: false,
  //     }
  //   : null;
  return {
    props: {
      portfolio: data,
    },
    revalidate: 1,
  };
  // try {
  //   const res = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  //   );

  //   return {
  //     props: {
  //       portfolio: res.data,
  //     },
  //   };
  // } catch (e) {
  //   console.error();
  // }
}

export default PortfolioById;
