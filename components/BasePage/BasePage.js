import { Container } from "reactstrap";

const BasePage = (props) => {
  const { children, className = "" } = props;

  return (
    <div className={`base-page ${className}`}>
      <Container>{children}</Container>
    </div>
  );
};

export default BasePage;
