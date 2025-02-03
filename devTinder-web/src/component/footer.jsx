import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white text-center py-6 mt-auto bg-transparent">
      <div className="container mx-auto flex flex-col md:flex-row justify-center gap-6">
        <Link to="https://razorpay.com/privacy/" target="_blank" className="hover:text-gray-400">
          Policy
        </Link>
        <Link to="https://razorpay.com/s/terms/customer/" target="_blank" className="hover:text-gray-400">
          Terms & Conditions
        </Link>
        <Link to="https://razorpay.com/s/customer-grievance-redressal-policy/" target="_blank" className="hover:text-gray-400">
          Query
        </Link>
        <Link to="https://razorpay.com/docs/payments/refunds/" target="_blank" className="hover:text-gray-400">
          Refund Policy
        </Link>
        <Link to="https://ifinltd.in/PdfFiles/refund.pdf" target="_blank" className="hover:text-gray-400">
          Cancellation
        </Link>
        <Link to="https://razorpay.com/learn/e-commerce-shipping-best-strategies-and-practices/" target="_blank" className="hover:text-gray-400">
          Shipping & Delivery
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
