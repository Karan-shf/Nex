import { useNavigate, useParams } from "react-router-dom"
import userContext, { useUserContext } from "../../contexts/UserContexts"
import useOtherUser from "./useOtherUser";



const UserProfile = () => {

    const {id} = useParams()

    const { user, setUser } = id ? useOtherUser(id) : useUserContext();

    const navigate = useNavigate()
    return (
        <div>
            <p>{user?.id}</p>
            <p>{user?.email}</p>

            <p>{user?.birthDate?.toString()}</p>

            <p>{user?.name}</p>

            <p>{user?.username}</p>

            <button onClick={()=>{localStorage.removeItem("x-auth-token");navigate("/signupOrLogin")}}>logout</button>

        </div>
    )
}

export default UserProfile