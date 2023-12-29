import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, unwrap } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { ATake, DataOnEntry } from "server/types";

type ModalContent = {
    title: string,
    body?: (() => JSX.Element) | string,
    noTextForBody?: boolean,
    input?: {
        value: string,
        onChangeText: React.Dispatch<React.SetStateAction<string>>,
        placeholder: string,
        placeholderTextColor: string,
        style: StyleProp<TextStyle>,
        keyboardType?: KeyboardTypeOptions
    },
    onModalOkay?: CallableFunction,
    onModalCloseWithoutOkay?: CallableFunction,
    onModalClose?: CallableFunction,
}

export const loggedInAtom = atom(false);
export const modalVisibleAtom = atom(false);
export const modalValueAtom = atom<ModalContent>({ title: "", body: "" });

export const btnForClgPaneClickedAtom = atom(false);
export const btnForProfilePaneClickedAtom = atom(false);
export const profilePaneStatusAtom = atom<"show" | "hide" | "start-hiding" | "start-showing">("hide");
export const collegePaneStatusAtom = atom<"show" | "hide" | "start-hiding" | "start-showing">("hide");

export const otpAtom = atom("");

export const userDetailsAtom = storageAtom<{
    user: DataOnEntry["user"],
    clg: DataOnEntry["clg"],
    sessionId: string,
} | null>("userDetails", null);
export const takesAtom = atom<ATake[]>([]);


// util
function storageAtom<T>(key: string, value: T) {
    const asyncAtom = atomWithStorage(
        "@brat-" + key,
        value,
        createJSONStorage(() => AsyncStorage)
    );
    return unwrap(asyncAtom, prev => prev ?? null);
}