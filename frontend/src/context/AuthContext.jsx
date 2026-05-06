import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/auth";

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await getMe();

            setUser(res.user);
            console.log(res, isAuthenticated);
            setIsAuthenticated(true);
        } catch (err) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthProvider.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                fetchUser,
            }}
        >
            {children}
        </AuthProvider.Provider>
    );
};

export const useAuth = () => useContext(AuthProvider);

export default AuthContext;
