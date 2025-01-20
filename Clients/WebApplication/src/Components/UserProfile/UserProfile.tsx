import { useNavigate, useParams } from "react-router-dom"
import userContext, { useUserContext } from "../../contexts/UserContexts"
import useOtherUser from "./useOtherUser";
import { useEffect, useState } from "react";
import { User } from "../../Interfaces/Interfaces";




const UserProfile = () => {

    const {userID} = useParams()
    // console.log("fhjefojiefoi",userID)
    const {user:temp} = useUserContext()
    const navigate = useNavigate()

    console.log(temp , 'kkkkkkkkk')


    // const [user , setUser] = useState<any>()
    const { data:user , isLoading } =  useOtherUser(userID?? temp?.id.toString() ?? '')
    // const user = data?.data

    useEffect(()=>{
        if(String(temp?.id??'') == userID){
            navigate("/userProfile")
        }
    },[])

    
    return (
        <div>
        {!isLoading  ?
            <>
                {/* { JSON.stringify(data?.id + "hiiiiiiiii")} */}
                <p>{user?.id}</p> 
                <p>{user?.email}</p>

                <p>{user?.birthDate?.toString()}</p>

                <p>{user?.name}</p>

                <p>{user?.username}</p>

                <button onClick={()=>{localStorage.removeItem("x-auth-token");navigate("/signupOrLogin")}}>logout</button>
            </>
        : <p>khkhkhk</p>}

        </div>

    )
}

export default UserProfile