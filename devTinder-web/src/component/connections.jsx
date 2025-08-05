import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const fetchConnection = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/connections", {
        method: "GET",
        credentials: "include",
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
        dispatch(addConnection(data.data));
      } else {
        console.warn("No connections found in response.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, [dispatch]);

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

          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            gender,
            age,
            skills,
            about,
          } = connection;

          return (
            <div
              key={_id}
              className="border p-4 bg-base-300 rounded-lg shadow-md flex flex-col hover:shadow-lg items-center text-center"
            >
              <img
                alt={`${firstName} ${lastName}`}
                src={photoUrl || "/default-avatar.png"}
                className="w-28 h-28 rounded-full mb-4 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
              />
              <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
              <p className="text-gray-600">{age ? `${age} years old` : "Age not provided"}</p>
              <p className="text-gray-500 capitalize">{gender || "Gender not specified"}</p>
              {about && <p className="text-sm text-gray-700 mt-2 italic">{about}</p>}
              {skills && skills.length > 0 && (
                <div className="mt-2">
                 
                  <ul className="flex flex-wrap justify-center gap-1 mt-1">
                    {skills.map((skill, index) => (
                      <li
                        key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm"

                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
