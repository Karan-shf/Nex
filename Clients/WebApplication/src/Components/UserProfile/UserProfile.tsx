import { useNavigate } from "react-router-dom"
import userContext, { useUserContext } from "../../contexts/UserContexts"



const UserProfile = () => {
    const {user , setUser} = useUserContext()
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