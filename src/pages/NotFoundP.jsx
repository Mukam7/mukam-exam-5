import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundP = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link to={"/"} type="primary">
          Back Home
        </Link>
      </Button>
    }
  />
);
export default NotFoundP;
