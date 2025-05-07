import useUser, { UserProvider } from './use-user';
import useFetchApi from './use-fetch-api';
import useStore, { StoreProvider } from './use-store';

export { useStore, useUser, useFetchApi };

export function Provider({ children }) {
    return <UserProvider>
        <StoreProvider>
        {children}
        </StoreProvider>
    </UserProvider>
}