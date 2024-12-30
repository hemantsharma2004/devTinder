import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [Firstname, setFirstName] = useState(users?.firstName || "");
    const [LastName, setLastName] = useState(users?.lastName || "");
    const [PhotoUrl, setPhotoUrl] = useState(users?.photoUrl || "");
    const [Age, setAge] = useState(Number(users?.age) || "");
    const [Gender, setGender] = useState(users?.gender || "");
    const [Error, setError] = useState("");
    const [ShowToast, setShowToast] = useState(false);

    useEffect(() => {
        if (users) {
            setFirstName(users.firstName);
            setLastName(users.lastName);
            setPhotoUrl(users.photoUrl);
            setAge(Number(users.age) || ""); // Ensure Age is a number
            setGender(users.gender);
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
        setError('');
        try {
            const payload = {
                firstName: Firstname,
                lastName: LastName,
                photoUrl: PhotoUrl,
                age: Age,
                gender: Gender,
            };
    
            console.log('Payload:', payload);
    
            const res = await axios.patch('http://localhost:3000/profile/edit', payload, {
                withCredentials: true,
            });
    
            console.log('Response:', res.data);
    
            // Dispatch the updated user data to Redux
            dispatch(addUser(res.data));
    
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setPhotoUrl(res.data.photoUrl);
            setAge(res.data.age);
            setGender(res.data.gender);
    
            setShowToast(true);
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'An unexpected error occurred.');
        }
    };
    

    return (
        <>
            <div className="flex justify-evenly my-10 mx-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">First name</span>
                                </div>
                                <input
                                    type="text"
                                    value={Firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Last name</span>
                                </div>
                                <input
                                    type="text"
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input
                                    type="text"
                                    value={PhotoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input
                                    type="number"
                                    value={Age}
                                    onChange={(e) => setAge(Number(e.target.value))}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>

                            <label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Gender</span>
                                </div>
                                <input
                                    type="text"
                                    value={Gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </label>
                            <p className="text-red-500">{Error}</p>
                        </div>

                        <div className="card-actions justify-center m-2">
                            <button type="button" className="btn btn-primary" onClick={saveProfile}>
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mx-10 h-[500px]">
                    <h2 className="text-2xl font-semibold mb-4">User Info</h2>
                    <div className="card bg-base-300 shadow-lg p-6 w-80 rounded-lg overflow-hidden">
                        <div className="mb-4 flex flex-col items-center">
                            <img 
                                src={PhotoUrl} 
                                alt={`${Firstname} ${LastName}`} 
                                className="w-40 h-44 mb-4"
                            />
                            <h3 className="text-xl font-bold text-center">{Firstname} {LastName}</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="flex justify-between">
                                <span className="font-medium">Photo URL:</span>
                                <span className="truncate">{PhotoUrl}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium">Age:</span>
                                <span>{Age}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium">Gender:</span>
                                <span>{Gender}</span>
                            </p>
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
