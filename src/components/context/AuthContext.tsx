"use client";

import React, {createContext, useContext, useState} from "react";

interface AuthContextType {
    showRegisterPromo: boolean;
    toggleRegisterPromo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [showRegisterPromo, setShowRegisterPromo] = useState(true);

    const toggleRegisterPromo = () => {
        setShowRegisterPromo(prev => !prev);
    };

    return (
        <AuthContext.Provider value={{showRegisterPromo, toggleRegisterPromo}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
