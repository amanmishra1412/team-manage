import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            <AuthProvider.Provider
                value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
            >
                {children}
            </AuthProvider.Provider>
        </div>
    );
};

export const useAuth = () => useContext(AuthProvider);

export default AuthContext;
