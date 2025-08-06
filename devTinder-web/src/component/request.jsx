import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.request);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await fetch(`http://localhost:3000/request/review/${status}/${_id}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error(`Failed to review request: ${res.status}`);

            const result = await res.json();
            console.log("Review request response:", result);

            dispatch(removeRequest(_id));
        } catch (err) {
            console.error("Error reviewing request:", err);
        }
    };

    const fetchRequest = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/requests/received", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error(`Failed to fetch requests: ${res.status}`);

            const data = await res.json();
            console.log("Fetched requests:", data); // Debug API response

            if (data && Array.isArray(data.data)) {
                dispatch(addRequest(data.data));
            } else {
                console.error("Unexpected API response format:", data);
            }
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!Array.isArray(requests) || requests.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl text-gray-600">No Request found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Pending Requests</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {requests.map((request) => {
                    if (!request.fromUserId) return null; // Avoid undefined errors

                    const { firstName, lastName, photoUrl, gender, age } = request.fromUserId;

                    return (
                        <div key={request._id} className="border p-4 bg-base-300 rounded-lg shadow-md flex flex-col hover:shadow-slate-400 items-center">
                            <img
                                alt={`${firstName} ${lastName}`}
                                src={photoUrl || "https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?rs=1&pid=ImgDetMain"}
                                className="w-32 h-32 rounded-full mb-4"
                            />
                            <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
                            <p className="text-gray-600">{`${age} years old`}</p>
                            <p className="text-gray-500 capitalize">{gender}</p>

                            <div className="text-center">
                                <button className="btn btn-primary mx-8 my-4" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Request;
