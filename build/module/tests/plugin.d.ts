export declare enum UserRoles {
    MEMBER = "MEMBER",
    ADMIN = "ADMIN",
    IT = "IT"
}
export declare class User {
    id: string;
    username: string;
    password: string;
    email: string;
    roles: UserRoles;
    managerId?: string;
}
export declare class Team {
    id: string[];
    name: string;
    members: User[];
}
