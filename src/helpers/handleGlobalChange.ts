import { socket } from "./socket";

type ChangeQuery = {
    "handleLike": {
        takeId: string,
        likes: number,
        dislikes: number,
    },
};

type AChange<T extends keyof ChangeQuery> = {
    event: T,
    query: ChangeQuery[T],
    sessionId: string,
};


export function handleGlobalChange<T extends keyof ChangeQuery>(
    change: AChange<T>,
) {
    socket.emit(change.event, change.query, change.sessionId);
}
