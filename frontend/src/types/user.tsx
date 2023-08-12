type User = {
    _id: string,
    username: string,
    fullName: string,
    deletedAt: Date,
    isDeleted: boolean,
    email: string,
    password: string,
    ghAccessKey: string,
    ghRefreshKey: string,
    avatar: string
}

export { 
    type User,
}