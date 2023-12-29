export type UserForSignup = {
    username: string,
    mail: string,
    password: string,
}

export type UserForLogin = {
    mail: string,
    password: string,
}

export type ATake = {
    _id: string,
    
    author?: string,
    clgId?: string,
    content?: {
        title?: string,
        body?: string,
    },
    likes?: number,
    dislikes?: number,
    likedBy?: string[],
    dislikedBy?: string[],

    createdAt?: string,
}

export type DataOnEntry = {
    user: {
        name: string,
        posts: number,
        likes: number,
    },
    clg: {
        name: string,
        id: string,
        totalMembers: number,
        onlineMembers: number,
        pfp: string,
    },
    sessionId: string,
    
    takes: ATake[],
}