type User = {
    firstName: string;
    lastName: string;
    username: string; // This doesen't actually exist backend but was requested.
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