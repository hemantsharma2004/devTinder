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
     const [isLogin, setIsLogin] = useState(true);
     const [age, setAge] = useState("");
     const [Error, setError] = useState("");
     const dispatch = useDispatch();
     const navigate= useNavigate();

      const handleSignup= async ()=>{
           try{
              const res= await axios.post("http://localhost:3000/signup", {
               firstName, 
               lastName, 
               age,
               emailId,
               Password,
              }, {
                withCredentials: true
              })
  
              dispatch(addUser(res.data));
               return navigate("/profile");

           } catch (err) {
               setError(err.message || "invalid Crediantals");
          }
      }

     const handleClick = async () => {
          try {
               const res = await axios.post("http://localhost:3000/login", {
                    emailId,
                    Password,
               }, { withCredentials: true });

               dispatch(addUser(res.data));
                return navigate("/");
             
          } catch (err) {
               setError(err.message ||  "Invalid email or password. Please try again.");
          }
     }

     return (

          <div className="flex justify-center  my-10">

               <div className="card bg-base-300 w-96 shadow-xl">

                    <div className="card-body">
                         <h2 className="card-title justify-center">{isLogin ? "LogIn" : "SignUp"} </h2>
                         <div>
                           {!isLogin &&   ( <>
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
                                        type="text"
                                        value={Password}
                                        onChange={(p) => setPassword(p.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                   />
                              </label>
                               <p className="text-red-500">{Error}</p>
                         </div>
                         <div className="card-actions justify-center m-2">
                              <button className="btn btn-primary" onClick={isLogin ? handleClick : handleSignup}>{isLogin ? "LogIn" : "signUp"}</button>
                         </div>

                         <p className="text-center mx-auto cursor-pointer" onClick={()=> setIsLogin((value) => !value)}>{isLogin ? "New User? Signup here" : "Existing User? Login here"}</p>
                    </div>
               </div>
          </div>
     )
}

export default Login;