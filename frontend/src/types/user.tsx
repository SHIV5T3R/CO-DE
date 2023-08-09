type User = {
    first_name: string;
    last_name: string;
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