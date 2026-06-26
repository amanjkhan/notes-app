import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-primary sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand text-white" to="/">
          <h3 className="m-0">My Notes</h3>
        </Link>
      </div>
    </nav>
  );
}
