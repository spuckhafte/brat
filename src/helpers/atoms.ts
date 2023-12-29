import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, unwrap } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";

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
    onModalClose?: CallableFunction
}

const loggedInAtomAsync = atomWithStorage(
    "@brat-loggedIn",
    false,
    createJSONStorage(() => AsyncStorage)
);
const sessionIdAtomAsync = atomWithStorage(
    "@brat-sessionId",
    "",
    createJSONStorage(() => AsyncStorage)
);

export const loggedInAtom = unwrap(loggedInAtomAsync, prev => prev ?? null);
export const sessionIdAtom = unwrap(sessionIdAtomAsync, prev => prev ?? null);

export const modalVisibleAtom = atom(false);
export const modalValueAtom = atom<ModalContent>({ title: "", body: "" });

export const btnForClgPaneClickedAtom = atom(false);
export const btnForProfilePaneClickedAtom = atom(false);
export const profilePaneStatusAtom = atom<"show" | "hide" | "start-hiding" | "start-showing">("hide");
export const collegePaneStatusAtom = atom<"show" | "hide" | "start-hiding" | "start-showing">("hide");

export const otpAtom = atom("");