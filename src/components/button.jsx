import { Link } from "react-router-dom";

export default function Button({ children }) {
  return (
    <Link to={"/signup"} className="get-started">
      {children}
    </Link>
  );
}
