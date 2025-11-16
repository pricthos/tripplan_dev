
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const token = getCookie('tpToken');
                if (token === 'test') {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Could not parse auth token:", error);
                setIsAuthenticated(false);
            }
        }
        setIsLoading(false);
    }, []);

    const login = () => {
        setCookie('tpToken', 'test', 7);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeCookie('tpToken');
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return null; // Prevent flicker while checking authentication
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
