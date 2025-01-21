import { useEffect, useState } from "react"
import { APILink } from "../../consts/consts"


interface Props{
    followingID: string
    isFollowed : boolean
    setFollowerAdjuster: React.Dispatch<React.SetStateAction<number>>
}


const FollowButton = ({followingID , isFollowed , setFollowerAdjuster }:Props) => {
    
    
    
    
    const [isFollowedState , setIsFollowedState] = useState(isFollowed)
    
    useEffect(()=>{
        if (!(isFollowedState !== isFollowed)){
            setFollowerAdjuster(0)
        }else if (!isFollowedState && isFollowed){
            setFollowerAdjuster(-1) 
        }else if (isFollowedState && !isFollowed){
            setFollowerAdjuster(1) 
        }else if (!isFollowedState && !isFollowed){
            setFollowerAdjuster(0) 
        }
    },[isFollowedState])

    async function ToggleFollow(){


        setIsFollowedState(!isFollowedState)
        try {
            const res = await fetch(APILink+"core/following/", {
                method: "POST",
                headers: {
                "Content-Type": "application/json", 
                "x-auth-token":localStorage.getItem("x-auth-token") ?? ""
                },
                body: JSON.stringify({"followingID":followingID}), 
            });
        
            const result = await res.json(); 
            
            if(result.success){


            }else{

            }
            if (res.ok) {

                console.log("Request successful:", result);
            } else {
                console.log("Request failed:", result);
            }
            } catch (error) {
            console.error("Error occurred:", error);
            }
    }
    return (
        <button onClick={()=>{ToggleFollow()}} className={`text-lh ${isFollowedState ? "bg-white text-primary" :"bg-primary text-white"} px-6 h-fit py-2 rounded-full`} >
            {isFollowedState ? "Following" : "Follow"}
        </button>
    )
}

export default FollowButton