import { atom } from "jotai";

export const entryModeAtom = atom<"login" | "signup" | null>(null);