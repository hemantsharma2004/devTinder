import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

// When the URL is /body, it renders:

// <Body /> → ✅ always

// and inside <Body />, it will render <Feed /> because of index

// this is my body and in the outlet means its child route and the child toute is feed so inside 
// the /body the feed page will work because of index

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); 

  const fetchUsers = async () => {
    try {
      const res = await  fetch("http://localhost:3000/profile/view", {
        method: "GET",
        withCredentials: true,
      });
      
      dispatch(addUser(res.data)); 
     

    } catch (err) {
      if (err.response && err.response.status === 401) {  
        navigate("/login");
      }
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    if (!user) {  
      fetchUsers();
    }
  }, [user]);

  if (!user) {
    return null;  
  }

  return (
    <div>
    
      
      {/* This Outlet will render child routes (Feed, Profile, etc.) */}
      <Outlet />
    </div>
  );
};

export default Body;
