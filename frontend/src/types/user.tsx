type User = {
    _id: string,
    username: string,
    full_name: string,
    deleted_at: Date,
    is_deleted: boolean,
    email: string,
    password: string,
    gh_access_key: string,
    gh_refresh_key: string,
    avatar: string
}

export { 
    type User,
}