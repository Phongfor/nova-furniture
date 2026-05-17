import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const parseJwt = (token) => {
        try {
            const base64Payload = token.split('.')[1];

            const payload = atob(base64Payload);

            return JSON.parse(payload);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = parseJwt(token);

            if (decoded) {
                setUser({
                    email: decoded.sub,
                    role: decoded.role
                });
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);

        const decoded = parseJwt(token);
        console.log(decoded);
        if (decoded) {
            setUser({
                email: decoded.sub,
                role: decoded.role
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
