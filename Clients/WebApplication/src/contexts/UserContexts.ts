import { createContext, useContext } from "react";
import { User } from "../Interfaces/Interfaces";


interface userContextType {
    user: User | undefined | null;
    setUser: React.Dispatch<React.SetStateAction<User | undefined | null>>;
    isLoading: boolean | undefined | null;
}

let userContext = createContext<userContextType>({} as userContextType);

export const useUserContext = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("error userContext");
    }
    return context;
};

export default userContext;