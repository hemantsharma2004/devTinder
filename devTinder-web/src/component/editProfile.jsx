import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Default profile image if none provided
    const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    const [Firstname, setFirstName] = useState(users?.firstName || "");
    const [LastName, setLastName] = useState(users?.lastName || "");
    const [PhotoUrl, setPhotoUrl] = useState(users?.photoUrl || defaultProfileImage);
    const [Age, setAge] = useState(users?.age !== undefined && users?.age !== null ? users.age : "");
    const [Gender, setGender] = useState(users?.gender || "");
    const [Error, setError] = useState("");
    const [ShowToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch("http://localhost:3000/profile/view", {
                    method: "GET",
                    credentials: "include",
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                
                const data = await res.json();
                // Ensure photoUrl has a default if empty
                if (!data.photoUrl) {
                    data.photoUrl = defaultProfileImage;
                }
                dispatch(addUser(data));
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
            }
        };

        fetchUserProfile();
    }, [dispatch]);

    useEffect(() => {
        if (users) {
            setFirstName(users.firstName || "");
            setLastName(users.lastName || "");
            setPhotoUrl(users.photoUrl || defaultProfileImage);
            setAge(users?.age !== undefined && users?.age !== null ? users.age : "");
            setGender(users.gender || "");
        }
    }, [users]);

    useEffect(() => {
        let timeoutId;
        if (ShowToast) {
            timeoutId = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        return () => clearTimeout(timeoutId);
    }, [ShowToast]);

    const saveProfile = async () => {
        setError("");
        try {
            const payload = {
                firstName: Firstname,
                lastName: LastName,
                photoUrl: PhotoUrl,
                age: Age,
                gender: Gender,
            };

            const res = await fetch("http://localhost:3000/profile/edit", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || errorData.message || "An unexpected error occurred.");
            }

            const data = await res.json();
            // Update Redux store with the updated user data from response
            dispatch(addUser(data.data || data));

            setShowToast(true);
        } catch (err) {
            console.error("Save profile error:", err);
            setError(err.message);
        }
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:justify-evenly my-10 mx-4 lg:mx-10 gap-8">
                {/* Profile Display Card - Left Side */}
                <div className="card bg-base-300 w-full lg:w-96 shadow-xl h-fit">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-lg lg:text-xl">Your Profile</h2>
                        <div className="flex flex-col items-center">
                            <div className="avatar mb-4">
                                <div className="w-32 rounded-full">
                                    <img 
                                        src={PhotoUrl || defaultProfileImage} 
                                        alt="Profile" 
                                        onError={(e) => {
                                            e.target.src = defaultProfileImage;
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-semibold">Name:</span>
                                    <span className="text-right">
                                        {Firstname || 'Not specified'} {LastName || ''}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-semibold">Age:</span>
                                    <span>{Age || 'Not specified'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-semibold">Gender:</span>
                                    <span>{Gender || 'Not specified'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form Card - Right Side */}
                <div className="card bg-base-300 w-full lg:w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-lg lg:text-xl">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">First name</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={Firstname} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Last name</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={LastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input 
                                    type="text" 
                                    value={PhotoUrl} 
                                    onChange={(e) => setPhotoUrl(e.target.value)} 
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input 
                                    type="number" 
                                    value={Age} 
                                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} 
                                    className="input input-bordered w-full" 
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <select
                                    value={Gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            {Error && <p className="text-red-500 text-sm">{Error}</p>}
                        </div>
                        <div className="card-actions justify-center m-2">
                            <button 
                                type="button" 
                                className="btn btn-primary w-full lg:w-auto" 
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {ShowToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully!</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;