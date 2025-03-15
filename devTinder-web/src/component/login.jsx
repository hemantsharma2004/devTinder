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
    const [isLogin, setIsLogin] = useState(true);
    const [age, setAge] = useState("");
    const [error, setError] = useState("");  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🔹 Signup Function
    const handleSignup = async (e) => {
        e.preventDefault();
        let newAge = parseInt(age);
        try {
            const res = await fetch("https://devtinder-backend-2oh0.onrender.com/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, age: newAge, gender, emailId, password }),
            });
            
            const data = await res.json();
            console.log("Signup Response:", data); // ✅ Debugging

            if (!res.ok) {
                throw new Error(data.error || "Signup failed. Please try again.");
            }
            
            dispatch(addUser(data));
            navigate("/EditProfile");
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "Signup failed. Please try again.");
        }
    };

    // 🔹 Login Function
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://devtinder-backend-2oh0.onrender.com/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId, password }),
            });

            const data = await res.json();
            console.log("Login Response:", data); // ✅ Debugging

            if (!res.ok) {
                throw new Error(data.error || "Invalid email or password.");
            }

            dispatch(addUser(data));
            navigate("/body");
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLogin ? "LogIn" : "SignUp"} </h2>
                    <div>
                        {!isLogin && (
                            <>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age</span>
                                    </div>
                                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>
                        )}
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email ID</span>
                            </div>
                            <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLogin ? handleClick : handleSignup}>
                            {isLogin ? "LogIn" : "SignUp"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
