import prettyMilliseconds from "pretty-ms";

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

export type ATakeProp = {
    key: string;
    _id: string;
    username: string;
    time: string;
    title: string;
    body: string;
    likes: number;
    dislikes: number;
    userPostLikeStatus: boolean | null;
}

export function parseAllTakes(takes: ATake[]): ATakeProp[] {
    return takes
        .map(item => parseATake(item))
        .sort((a, b) => +b.time - +a.time);
}

const ms = (time: number) => prettyMilliseconds(time);

export function parseATake(take: ATake): ATakeProp {
    const userPostLikeStatus = postLikedStatus(take.likedBy, take.dislikedBy, take.author);

    const par = {
        key: take._id,
        _id: take._id,
        username: take.author as string,
        time: take.createdAt as string,
        title: take.content?.title as string,
        body: take.content?.body as string,
        likes: take.likes as number,
        dislikes: take.dislikes as number,
        userPostLikeStatus,
    }

    return par;
}

export function postLikedStatus(likedBy?: string[], dislikedBy?: string[], name?: string) {
    let userPostLikeStatus: boolean | null;
    
    if (likedBy?.includes(name as string))
        userPostLikeStatus = true;
    else if (dislikedBy?.includes(name as string))
        userPostLikeStatus = false;
    else
        userPostLikeStatus = null;

    return userPostLikeStatus;
}

export function beautifyTime(time?: string) {
    let ago = ms(Date.now() - +(time ?? 0)).split(' ')[0];
    
    if (ago.includes('d'))
        if (parseInt(ago) >= 365)
            ago = (parseInt(ago) / 365).toFixed(0) + 'y';
        else if (parseInt(ago) >= 30)
            ago = (parseInt(ago) / 30).toFixed(0) + 'm';
        else if (parseInt(ago) >= 7)
            ago = (parseInt(ago) / 7).toFixed(0) + 'w';
        else ago = ago;

    return ago;
}
