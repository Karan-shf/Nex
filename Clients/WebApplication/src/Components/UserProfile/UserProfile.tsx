import userContext, { useUserContext } from "../../contexts/UserContexts"



const UserProfile = () => {
    const {user , setUser} = useUserContext()

    return (
        <div>
            <p>{user?.id}</p>
            <p>{user?.email}</p>

            <p>{user?.birthDate.getDate()}</p>

            <p>{user?.name}</p>

            <p>{user?.username}</p>

            </div>
    )
}

export default UserProfile