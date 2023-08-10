type User = {
    firstName: string;
    lastName: string;
    email: string;
    image: string; // Needs to be an actual image.
}

enum UserPermissions {
    MEMBER,
    MOD,
    ADMIN,
    OWNER
}

export { 
    type User,
    UserPermissions
}