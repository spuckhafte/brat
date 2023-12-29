import { useEffect } from "react"
import { socket } from "../socket";

type StandardSocket = {
    mainEvent: string,

    onErr: CallableFunction,
    onDone: CallableFunction,

    otherEvents?: {
        [index: `on${string}`]: CallableFunction
    };
}

export default (board: StandardSocket) => {
    useEffect(() => {
        let mapEventsToCb: {
            [index: string]: CallableFunction
        };

        mapEventsToCb = {
            [board.mainEvent + "Err"]: board.onErr,
            [board.mainEvent + "Done"]: board.onDone,
        };

        if (board.otherEvents)
            for (let event of Object.keys(board.otherEvents))
                mapEventsToCb[
                    board.mainEvent + event.split("on")[1]
                ] = board.otherEvents[event];

        for (let event of Object.keys(mapEventsToCb))
            socket.on(
                event,
                mapEventsToCb[event] as (...args: any[]) => void
            );

        return () => {
            for (let event of Object.keys(mapEventsToCb))
                socket.off(
                    event,
                    mapEventsToCb[event] as (...args: any[]) => void
                );
        }
    }, []);
}

export function useNormalSocket(func: React.EffectCallback) {
    useEffect(func, []);
}