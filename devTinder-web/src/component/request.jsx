import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest , removeRequest} from "../utils/requestSlice";
import { useEffect } from "react";

const Request=()=>{ 

    const dispatch= useDispatch();
    const requests= useSelector((state)=> state.request);


     const reviewRequest= async(status , _id)=>{
         try{
             const res= await axios.post("https://devtinder-backend-2oh0.onrender.com/request/review/"+ status + "/" + _id, {}, {
                 withCredentials: true,
             });
             dispatch(removeRequest(_id))
             console.log(res);
         }
         catch(err){
             console.log(err);
         }
     }

     

    const fetchRequest= async()=>{ 
            try{
        const res= await axios.get("https://devtinder-backend-2oh0.onrender.com/user/requests/recieved", {
             withCredentials: true,
        })
      console.log("get requestr", res.data);
      dispatch(addRequest(res.data.data));
    }
    catch(err){
         console.log(err);
    }
    }
      useEffect(()=>{
         fetchRequest();
      },[]);



      if (!Array.isArray(requests) || requests.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl text-gray-600">No Request found</h1>
            </div>
        );
    }

     
    

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Pending Request</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, gender, age } = request.fromUserId;

          return (
            <div key={`${firstName}-${lastName}`} className="border p-4 bg-base-300 rounded-lg shadow-md flex flex-col hover:shadow-slate-400 items-center">
              <img
                alt={`${firstName} ${lastName}`}
                src={photoUrl ? photoUrl : "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?rs=1&pid=ImgDetMain"}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
              <p className="text-gray-600">{`${age} years old`}</p>
              <p className="text-gray-500 capitalize">{gender}</p>

              <div className="text-center">
        <button className="btn btn-primary mx-8 my-4" onClick ={()=> reviewRequest("rejected", request._id)}>Reject</button>
        <button className="btn btn-secondary" onClick ={()=> reviewRequest("accepted", request._id)}>Accept</button>
        </div>
            </div>

            
          );

          
        })}

        
      </div>
    </div>
  );
}

export default Request;