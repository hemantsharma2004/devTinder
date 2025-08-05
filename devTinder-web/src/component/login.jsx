import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState(""); 
    const [password, setPassword] = useState("");  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [error, setError] = useState("");  
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateFields = () => {
        if (!emailId || !password) {
            return "Email and password are required.";
        }
        if (!isLogin) {
            if (!firstName || !lastName || !gender || !age || !photoUrl) {
                return "All fields are required for signup.";
            }
            if (!photoUrl.match(/^https?:\/\/.+\..+/)) {
                return "Please enter a valid URL for your profile photo";
            }
            if (isNaN(age) || parseInt(age) <= 0) {
                return "Please enter a valid age";
            }
        }
        return null;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    firstName, 
                    lastName, 
                    age: parseInt(age), 
                    gender, 
                    emailId, 
                    password,
                    photoUrl
                }),
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Signup failed.");

            dispatch(addUser(data));
            navigate("/EditProfile");
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "Signup failed. Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Invalid email or password.");

            dispatch(addUser(data));
            navigate("/body");
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Login failed.");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLogin ? "Log In" : "Sign Up"}</h2>

                    {!isLogin && (
                        <>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">First Name</span>
                                <input 
                                    type="text" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    className="input input-bordered" 
                                    required
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">Last Name</span>
                                <input 
                                    type="text" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    className="input input-bordered" 
                                    required
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">Gender</span>
                                <select 
                                    className="select select-bordered" 
                                    value={gender} 
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">Age</span>
                                <input 
                                    type="number" 
                                    value={age} 
                                    onChange={(e) => setAge(e.target.value)} 
                                    className="input input-bordered" 
                                    min="1"
                                    required
                                />
                            </label>
                            <label className="form-control w-full max-w-xs my-2">
                                <span className="label-text">Profile Photo URL</span>
                                <input 
                                    type="url" 
                                    value={photoUrl} 
                                    onChange={(e) => setPhotoUrl(e.target.value)} 
                                    className="input input-bordered" 
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                />
                            </label>
                            {photoUrl && (
                                <div className="flex justify-center my-2">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={photoUrl} alt="Profile preview" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <label className="form-control w-full max-w-xs my-2">
                        <span className="label-text">Email ID</span>
                        <input 
                            type="email" 
                            value={emailId} 
                            onChange={(e) => setEmailId(e.target.value)} 
                            className="input input-bordered" 
                            required
                        />
                    </label>

                    <label className="form-control w-full max-w-xs my-2">
                        <span className="label-text">Password</span>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="input input-bordered" 
                            required
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignup}>
                            {isLogin ? "Log In" : "Sign Up"}
                        </button>
                    </div>

                    <div className="text-center mt-2">
                        <p className="text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button 
                                className="text-blue-400 underline" 
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                }}
                            >
                                {isLogin ? "Sign Up" : "Log In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;