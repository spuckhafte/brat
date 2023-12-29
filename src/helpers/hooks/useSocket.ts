import { useEffect } from "react"
import { socket } from "../socket";

type StandardSocket = {
    mainEvent: string,

    onErr: CallableFunction,
    onDone: CallableFunction,

    otherEvents: {
        [index: `on${string}`]: CallableFunction
    };
}

export default (board: StandardSocket) => {
    useEffect(() => {
        let eventToCbMap: {
            [index: string]: CallableFunction
        };

        eventToCbMap = {
            [board.mainEvent + "Err"]: board.onErr,
            [board.mainEvent + "Done"]: board.onDone,
        };

        Object.keys(board.otherEvents).forEach(event => {
            eventToCbMap[board.mainEvent + event.split("on")[1]] =
                board.otherEvents[event];
        });

        for (let event of Object.keys(eventToCbMap))
            socket.on(
                event, 
                eventToCbMap[event] as (...args: any[]) => void
            );
        
        return () => {
            for (let event of Object.keys(eventToCbMap))
                socket.off(
                    event, 
                    eventToCbMap[event] as (...args: any[]) => void
                );
        }
    }, []);
}

export function useNormalSocket(func: React.EffectCallback) {
    useEffect(func, []);
}