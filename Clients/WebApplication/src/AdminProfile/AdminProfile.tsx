import { useNavigate } from "react-router-dom"
import userContext, { useUserContext } from "../contexts/UserContexts"
import { useAdminContext } from "../contexts/AdminContexts"



const AdminProfile = () => {
    const {admin , setAdmin} = useAdminContext()
    const navigate = useNavigate()
    return (
        <div>
            <p>{admin?.id}</p>
            <p>{admin?.email}</p>

            <p>{admin?.birthDate?.toString()}</p>

            <p>{admin?.name}</p>

            <p>{admin?.username}</p>

            <button onClick={()=>{localStorage.removeItem("x-auth-token");navigate("/admin/adminLogin")}}>logout</button>

        </div>
    )
}

export default AdminProfile