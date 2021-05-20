import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Secretssr = (props) => {
  console.log(props);
  return <h1>hello </h1>;
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    return {
      props: {
        title: "how to add to the props",
      },
    };
  },
});

export default Secretssr;
