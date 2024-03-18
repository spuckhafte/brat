import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, unwrap } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ATake, DataOnEntry } from "server/types";
import { ATakeProp } from "./takeParser";

type ModalContent = {
    title?: string,
    body?: (() => JSX.Element) | string,
    noTextForBody?: boolean,
    onModalOkay?: CallableFunction,
    onModalCloseWithoutOkay?: CallableFunction,
    onModalClose?: CallableFunction,
    customFullScreen?: boolean,
}

export type FrontendData = {
    user: DataOnEntry["user"],
    clg: DataOnEntry["clg"],
    sessionId: string,
}

export const loggedInAtom = atom(false);
export const modalVisibleAtom = atom(false);
export const modalValueAtom = atom<ModalContent>({ title: "", body: "" });

export const btnForClgPaneClickedAtom = atom(false);
export const btnForProfilePaneClickedAtom = atom(false);
export const profilePaneStatusAtom = atom<"show" | "hide" | "start-hiding" | "start-showing">("hide");
export const collegePaneStatusAtom = atom<"show" | "hide" | "start-hiding" | "start-showing">("hide");

export const otpAtom = atom("");

export const userDetailsAtom = storageAtom<FrontendData | null>("userDetails", null);

export const takesAtom = atom<ATakeProp[]>([]);


// util
function storageAtom<T>(key: string, value: T) {
    const asyncAtom = atomWithStorage(
        "@brat-" + key,
        value,
        createJSONStorage(() => AsyncStorage)
    );
    return unwrap(asyncAtom, prev => prev ?? null);
}
