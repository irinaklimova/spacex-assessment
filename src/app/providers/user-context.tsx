import {createContext} from 'react';
import {User, UserPermissions} from "@/app/types/user";

export const UserContext = createContext<User>({permissions: UserPermissions.Admin});

export function UserProvider({children, user}: {children: React.JSX.Element, user: User}) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}