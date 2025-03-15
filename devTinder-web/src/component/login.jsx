import { useState } from "react";
import axios from "axios";
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
    const [error, setError] = useState("");  // updated error to lowercase
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
     console.log({ firstName, lastName, age, gender, emailId, Password });
     let newage = parseInt(age)     
     try {
         const res = await axios.post("http://localhost:3000/signup", {
             firstName,
             lastName,
             age:newage,
             gender,
             emailId,
             Password,
         }, {
             withCredentials: true,
         });
         dispatch(addUser(res.data));
         navigate("/EditProfile");
     } catch (err) {
         // Enhanced error logging
         console.error("Signup Error:", err);
         if (err.response) {
             // Log the response error details
             console.error("Error Response:", err.response.data);
             setError(err.response.data.message || "Signup failed. Please try again.");
         } else if (err.request) {
             // Log if there was no response from the server
             console.error("Error Request:", err.request);
             setError("No response from server. Please check your internet connection.");
         } else {
             // Other errors like request setup
             console.error("Error Message:", err.message);
             setError(err.message || "An unknown error occurred.");
         }
     }
 };
 

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", {
                emailId,
                Password,
            }, { withCredentials: true });
            console.log(res)
            dispatch(addUser(res.data));
            navigate("/body");
        } catch (err) {
            // Updated error handling to check for response data
            console.error("Login Error:", err.response || err.message);
            setError(err.response?.data?.message || "Invalid email or password. Please try again.");
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
                                    <input type="text" value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">LastName</span>
                                    </div>
                                    <input type="text" value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <input type="text" value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age</span>
                                    </div>
                                    <input type="text" value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                            </>
                        )}
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">EmailID</span>
                            </div>
                            <input type="text" value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>

                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"  // Updated type to password
                                value={Password}
                                onChange={(p) => setPassword(p.target.value)}
                                className="input input-bordered w-full max-w-xs"
                            />
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
