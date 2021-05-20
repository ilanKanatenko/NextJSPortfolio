import { useUser } from "@auth0/nextjs-auth0";
import Redirect from "../components/shared/Redirect";

const WithAuth = (Component) => {
  return (props) => {
    const { user, error, isLoading } = useUser();
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    if (!user) {
      return <Redirect to="/api/auth/login" />;
    } else {
      return <Component user={user.name} {...props} />;
    }
  };
};

export default WithAuth;
