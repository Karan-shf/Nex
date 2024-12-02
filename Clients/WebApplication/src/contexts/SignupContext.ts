import React, { createContext, useContext, Dispatch, SetStateAction } from "react";
import { UserSignupInterface } from "../Interfaces/Interfaces";

interface UserSignupContextInterface {
    userObj: UserSignupInterface | undefined;
    setUserObj: Dispatch<SetStateAction<UserSignupInterface | undefined>>;
    stage: "name email birth" | "verf code" | "password" | "pfp" | "username";
    setStage: Dispatch<SetStateAction<"name email birth" | "verf code" | "password" | "pfp" | "username">>;
}

export const SignupContext = createContext<UserSignupContextInterface | null>(null);

// Custom hook to use the SignupContext
export const useSignupContext = () => {
    const context = useContext(SignupContext);
    if (!context) {
        throw new Error("useSignupContext must be used within a SignupProvider");
    }
    return context;
};
