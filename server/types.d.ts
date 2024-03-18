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

export type FrontendUser = {
    name: string,
    posts: number,
    likes: number,
}

export type DataOnEntry = {
    user: FrontendUser,
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

export type NewTakeToPost = {
    author: string,
    clgId: string,
    content: {
        title: string,
        body: string,
    },
    likes: number,
    dislikes: number,
    likedBy: string[],
    dislikedBy: string[],

    createdAt: string,
}

export type Partial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
