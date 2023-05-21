import { Link } from "react-router-dom";

export default function Button({ children }) {
  return (
    <Link to={"/signup"}>
      <button className="get-started">{children}</button>
    </Link>
  );
}
