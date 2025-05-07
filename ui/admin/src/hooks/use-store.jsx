import { useState, useContext, createContext } from 'react';

export const StoreContext = createContext(null);
export function StoreProvider({ children }) {
    const [store, setStore] = useState(null);

    return <StoreContext.Provider value={{ store, setStore }}>
       {children}
    </StoreContext.Provider>
};

export default function useStore() { return useContext(StoreContext); }