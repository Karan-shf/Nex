import React, { createContext, useContext, Dispatch, SetStateAction } from "react";


interface TopBarContextInterface {
    title: string | undefined;
    setTitle: Dispatch<SetStateAction<string>>;
    hasBackward: boolean | undefined
    setHasBackward: Dispatch<SetStateAction<boolean>>;
}

export const TopBarContext = createContext<TopBarContextInterface | null>(null);

// Custom hook to use the SignupContext
export const useTopBarContext = () => {
    const context = useContext(TopBarContext);
    if (!context) {
        throw new Error("topBarContext must be used within a TopBarProvider");
    }
    return context;
};
