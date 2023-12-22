import { atom, useSetAtom } from "jotai";
import { atomWithStorage, createJSONStorage, unwrap } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loggedInAtomAsync = atomWithStorage(
    "@brat-loggedIn", 
    false,
    createJSONStorage(() => AsyncStorage)
);

export const loggedInAtom = unwrap(loggedInAtomAsync, prev => prev ?? null);