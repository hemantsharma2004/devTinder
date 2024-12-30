import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); 

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
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
