import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [Firstname, setFirstName] = useState(users?.firstName || "");
    const [LastName, setLastName] = useState(users?.lastName || "");
    const [PhotoUrl, setPhotoUrl] = useState(users?.photoUrl || "");
    const [Age, setAge] = useState(users?.age !== undefined && users?.age !== null ? users.age : "");
    const [Gender, setGender] = useState(users?.gender || "");
    const [Error, setError] = useState("");
    const [ShowToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch("https://devtinder-backend-2oh0.onrender.com/profile", {
                    method: "GET",
                    credentials: "include",
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                
                const data = await res.json();
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
            setPhotoUrl(users.photoUrl || "");
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

            const res = await fetch("https://devtinder-backend-2oh0.onrender.com/profile/edit", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "An unexpected error occurred.");
            }

            const data = await res.json();
            dispatch(addUser(data));

            setFirstName(data.firstName);
            setLastName(data.lastName);
            setPhotoUrl(data.photoUrl);
            setAge(data.age);
            setGender(data.gender);

            setShowToast(true);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:justify-evenly my-10 mx-4 lg:mx-10">
                <div className="card bg-base-300 w-full lg:w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-lg lg:text-xl">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">First name</span>
                                </div>
                                <input type="text" value={Firstname} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Last name</span>
                                </div>
                                <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input type="text" value={PhotoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input type="number" value={Age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} className="input input-bordered w-full" />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <input type="text" value={Gender} onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full" />
                            </label>
                            <p className="text-red-500 text-sm">{Error}</p>
                        </div>
                        <div className="card-actions justify-center m-2">
                            <button type="button" className="btn btn-primary w-full lg:w-auto" onClick={saveProfile}>Save Profile</button>
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
