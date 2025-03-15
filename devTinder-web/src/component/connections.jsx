import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnection = async () => {
    try {
      const res = await fetch("https://devtinder-backend-2oh0.onrender.com/user/connections", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Full API response:", data);

      if (data && data.data) {
        dispatch(addConnection(data.data)); // Only dispatch if valid data exists
      } else {
        console.warn("No connections found in response.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, [dispatch]); // Dependency array ensures proper re-renders

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
          if (!connection) return null;

          const { _id, firstName, lastName, photoUrl, gender, age } = connection;

          return (
            <div key={_id} className="border p-4 bg-base-300 rounded-lg shadow-md flex flex-col hover:shadow-lg items-center">
              <img
                alt={`${firstName} ${lastName}`}
                src={photoUrl || "/default-avatar.png"} // Fallback image
                className="w-28 h-28 rounded-full mb-4 object-cover"
                onError={(e) => (e.target.src = "/default-avatar.png")} // Handle broken images
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
