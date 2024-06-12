'use client'
import React, {createContext, useContext, useEffect, useState, ReactNode} from 'react';
import {auth} from './firebase/firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
import {User} from 'firebase/auth';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({currentUser: null, loading: true});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });


        const timer = setTimeout(() => {
            if (loading) {
                setLoading(false);  // Failsafe to ensure loading does not hang indefinitely
            }
        }, 500);  // Adjust time as necessary

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);






