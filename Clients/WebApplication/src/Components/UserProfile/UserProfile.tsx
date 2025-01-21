import { useNavigate, useParams } from "react-router-dom"
import userContext, { useUserContext } from "../../contexts/UserContexts"
import useOtherUser from "./useOtherUser";
import { useEffect, useState } from "react";
import { User } from "../../Interfaces/Interfaces";
import { useTopBarContext } from "../../contexts/TopBarContext";
import defaultBackPic from '../../assets/images/Frame 5(1).png'
import defaultUser from '../../assets/images/defaultAvatar.jpg'
import { GetMediaLink, Symbolize } from "../../functions/functions";



const UserProfile = () => {

    const {userID} = useParams()
    // console.log("fhjefojiefoi",userID)
    const {user:temp} = useUserContext()
    const navigate = useNavigate()

    console.log(temp , 'kkkkkkkkk')


    // const [user , setUser] = useState<any>()
    const { data:user , isLoading } =  useOtherUser(userID?? temp?.id.toString() ?? '')
    // const user = data?.data
    const {setHasBackward , setTitle} = useTopBarContext()   

    useEffect(()=>{
        if(String(temp?.id??'') == userID){
            navigate("/userProfile" , { replace: true })
        }

        if(userID){
            setHasBackward(true)
            setTitle(user?.name + "'s Profile")
        }else{
            setHasBackward(false)
            setTitle("Your" + " Profile")  
        }
    },[])

    
    return (
        <div>
        {!isLoading  ?
            <>
                {/* { JSON.stringify(data?.id + "hiiiiiiiii")} */}
                <img className=" h-52 w-full" src={user?.backgroundPic ? GetMediaLink(user?.backgroundPic) : defaultBackPic }></img>
                <div className="absolute flex justify-between items-center w-full top-44 left-10">
                    <div className="">
                        <img className="w-36 h-36 border-base-100 border-2 rounded-full" src={user?.profilePic ? GetMediaLink(user?.profilePic)  : defaultUser }></img>
                        <div>
                            <p className="text-2xl font-semibold mt-2">{user?.name}</p>
                            <p className="text-lg text-secondary">@{user?.username}</p>
                            <p className="text-lg mt-3">{user?.aboutUser}</p>
                            <div className="flex items-center gap-5 text-md mt-2">
                                <p className="text-secondary"><span className="text-white font-semibold">{Symbolize(1002122)}</span> Following</p>
                                <p className="text-secondary"><span className="text-white font-semibold">{Symbolize(1002122)}</span> Follower</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 right-20 absolute">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button className="text-lh bg-primary px-6 h-fit py-2 rounded-full" >Follow</button>
                    </div>
                </div>
                {/* <p className="mt-40">{user?.id}</p> 
                <p>{user?.email}</p>
                <p>{user?.birthDate?.toString()}</p> */}

            </>
        : <p>khkhkhk</p>}

        </div>

    )
}

export default UserProfile