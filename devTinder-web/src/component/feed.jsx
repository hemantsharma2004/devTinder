import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);

    const firstUser = feed && feed.length > 0 ? feed[0] : {};
    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = firstUser;
    
    console.log("feed", feed);  

    const handleSendRequest = async (status, userId) => {
        try {
            console.log("Status:", status, "UserId:", userId); 
            const res = await fetch(`https://devtinder-backend-2oh0.onrender.com/request/send/${status}/${userId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            const data = await res.json();
            console.log(data);
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            console.log("Error:", err.message);
        }
    };

    const getFeed = async () => {
        try {
            if (feed && feed.length > 0) return; 
            const res = await fetch("https://devtinder-backend-2oh0.onrender.com/feed", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            console.log("Feed fetched:", data);  
            dispatch(addFeed(data));
        } catch (err) {
            console.error("Something went wrong", err);
        }
    };

    useEffect(() => {
        if (!feed || feed.length === 0) {
            getFeed();
        }
    }, [feed]);

    return (
        <div className="flex justify-center my-10 text-center">
            {feed && feed.length > 0 ? (
                <div className="card bg-base-300 w-96 shadow-xl mx-auto">
                    <figure>
                        <img
                            src={photoUrl}
                            alt="user"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{firstName + " " + lastName}</h2>
                        
                        <p className="ml-2">{skills}</p>
                        <p>{age}</p>
                        <p>{gender}</p>
                        <p>{about}</p>
                        <div className="card-actions justify-center my-4">
                            <button className="btn btn-primary" 
                             onClick={()=> handleSendRequest("ignored", _id)}
                            >Ignore</button>
                            <button className="btn btn-secondary"
                              onClick={()=> handleSendRequest("interested", _id)}
                            >Interested</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading feed...</p>
            )}
        </div>
    );
};

export default Feed;
