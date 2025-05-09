import { useState, useContext, createContext } from 'react';

export const UserContext = createContext(null);
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    return <UserContext.Provider value={{ user, setUser }}>
       {children}
    </UserContext.Provider>
};

export default function useUser() { return useContext(UserContext); }