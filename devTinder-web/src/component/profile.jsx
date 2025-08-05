// src/pages/Profile.jsx

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState(reduxUser);
  const [loading, setLoading] = useState(!reduxUser);

  useEffect(() => {
    if (!reduxUser) {
      const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:3000/profile/view", {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Failed to load user");

          const data = await res.json();
          setUser(data.user);
          setLoading(false);

          // Optionally store in Redux
          // dispatch(setUser(data.user));
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [reduxUser]);

  if (loading || !user) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user.photoUrl || "/default-avatar.png"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
          onError={(e) => (e.target.src = "/default-avatar.png")}
        />

        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold text-indigo-700">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600"><strong>Email:</strong> {user.emailId}</p>
          <p className="text-gray-600"><strong>Gender:</strong> {user.gender}</p>
          <p className="text-gray-600"><strong>Age:</strong> {user.age}</p>
          <p className="text-gray-700 whitespace-pre-line"><strong>About:</strong> {user.about}</p>

          <div>
            <strong className="block text-gray-700 mb-1">Skills:</strong>
            <div className="flex flex-wrap gap-2">
              {user.skills?.length > 0 ? (
                user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No skills added.</span>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/body/edit-profile")}
            className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
