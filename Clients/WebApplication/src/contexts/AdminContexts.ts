import { createContext, useContext } from "react";
import { User } from "../Interfaces/Interfaces";


interface adminContextType {
    admin: User | undefined | null;
    setAdmin: React.Dispatch<React.SetStateAction<User | undefined | null>>;
    isLoading: boolean | undefined | null;
}

let adminContext = createContext<adminContextType>({} as adminContextType);

export const useAdminContext = () => {
    const context = useContext(adminContext);
    if (!context) {
        throw new Error("error adminContext");
    }
    return context;
};

export default adminContext;