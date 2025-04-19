import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white text-center py-6 mt-auto bg-transparent">
      <div className="container mx-auto flex flex-col md:flex-row justify-center gap-6">
        <Link to="/policy"  className="hover:text-gray-400">
          Policy
        </Link>
        <Link to="/termsandcondition" className="hover:text-gray-400">
          Terms & Conditions  
        </Link>
        <Link to="/contact"  className="hover:text-gray-400">
          Contact us
        </Link>
        <Link to="/refund"  className="hover:text-gray-400">
          Refund and Cancellation
        </Link>
       
       
        <Link to="/about" className="hover:text-gray-400 font-bold text-lg">
          About us
        </Link>
      </div>
      <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
