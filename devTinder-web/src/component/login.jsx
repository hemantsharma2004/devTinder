import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState(""); 
    const [Password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [age, setAge] = useState("");
    const [error, setError] = useState("");  
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                body: JSON.stringify({ firstName, lastName, age: newAge, gender, emailId, Password }),
            });
            
            if (!res.ok) {
                throw new Error("Signup failed");
            }
            
            const data = await res.json();
            dispatch(addUser(data));
            navigate("/EditProfile");
        } catch (err) {
            setError(err.message || "Signup failed. Please try again.");
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://devtinder-backend-2oh0.onrender.com/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId, Password }),
            });
            
            if (!res.ok) {
                throw new Error("Invalid email or password");
            }
            
            const data = await res.json();
            dispatch(addUser(data));
            navigate("/body");
        } catch (err) {
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
                                        <span className="label-text">FirstName</span>
                                    </div>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">LastName</span>
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
                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>
                        )}
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">EmailID</span>
                            </div>
                            <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" value={Password} onChange={(p) => setPassword(p.target.value)} className="input input-bordered w-full max-w-xs" />
                        </label>
                        <p className="text-red-500">{error}</p>
                    </div>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLogin ? handleClick : handleSignup}>
                            {isLogin ? "LogIn" : "SignUp"}
                        </button>
                    </div>
                    <p className="text-center mx-auto cursor-pointer" onClick={() => setIsLogin((value) => !value)}>
                        {isLogin ? "New User? Signup here" : "Existing User? Login here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
