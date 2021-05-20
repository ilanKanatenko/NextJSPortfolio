import WithAuth from "../hoc/WithAuth";

const Secret = ({ user }) => {
  return <h1>hello {user} </h1>;
};

export default WithAuth(Secret);
