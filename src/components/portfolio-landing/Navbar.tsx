import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 py-4">
        <Link to="/">
          <img
            src={logo}
            alt="Diego Fintelman Logo"
            className="h-10 md:h-12 w-auto cursor-pointer"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
