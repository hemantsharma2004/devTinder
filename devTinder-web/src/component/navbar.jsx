import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      
      const data = await response.json();
      if (data.message === "Logout successful") {
        dispatch(removeUser());
        // Clear any remaining state or local storage if needed
        localStorage.clear(); // Optional: if you store anything in localStorage
        navigate("/login", { replace: true });
      } else {
        throw new Error("Logout unsuccessful");
      }
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/error");
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-slate-400">
      <div className="flex-1">
        <Link to="/">
          <span className="btn btn-ghost text-xl">devTinder</span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/body/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/body/connection">Connections</Link></li>
              <li><Link to="/body/request">Request</Link></li>
              <li><Link to="/body">Feed</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;