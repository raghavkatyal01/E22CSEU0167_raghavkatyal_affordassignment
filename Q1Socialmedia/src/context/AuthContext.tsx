import { createContext, useState, useEffect, ReactNode } from "react";
import { authenticate } from "../api/socialmediaApi";

interface AuthContextType {
    token: string | null;
}

export const AuthContext = createContext<AuthContextType>({ token: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const getAuthToken = async () => {
            const newToken = await authenticate();
            setToken(newToken);
        };

        getAuthToken();
    }, []);

    return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};
