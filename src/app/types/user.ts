export enum UserPermissions {
    Admin = 'Admin',
    Guest = 'Guest'
}

export interface User {
    permissions: UserPermissions
}