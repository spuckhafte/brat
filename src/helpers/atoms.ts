import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, unwrap } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loggedInAtomAsync = atomWithStorage(
    "@brat-loggedIn", 
    false,
    createJSONStorage(() => AsyncStorage)
);

export const loggedInAtom = unwrap(loggedInAtomAsync, prev => prev ?? null);

export const btnForClgPaneClickedAtom = atom<true|false>(false);
export const btnForProfilePaneClickedAtom = atom<true|false>(false);
export const profilePaneStatusAtom = atom<"show"|"hide"|"start-hiding"|"start-showing">("hide");
export const collegePaneStatusAtom = atom<"show"|"hide"|"start-hiding"|"start-showing">("hide");