import axios from "axios";
import { useEffect } from "react";
import {addConnection} from "../utils/connectionSlice"
import { useDispatch, useSelector } from "react-redux";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnection = async () => {
    try {
      const res = await axios.get("/api/user/connections", {
        withCredentials: true,
      });
      console.log("Full API response:", res.data.data);

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);
  
  console.log("Redux connections state:", connections); 
  

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-gray-600">No connections found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {connections.map((connection) => {
          
          if (!connection) {
            return null; 
          }

          const { firstName, lastName, photoUrl, gender, age } = connection;

          return (
            <div key={connection._id} className="border p-4 bg-base-300 rounded-lg shadow-md flex flex-col hover:shadow-slate-400 items-center">
              <img
                alt={`${firstName} ${lastName}`}
                src={photoUrl}
                className="w-28 h-28 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
              <p className="text-gray-600">{`${age} years old`}</p>
              <p className="text-gray-500 capitalize">{gender}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
