import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Entry from "./components/views/entry/Entry";
import cssVar from "./helpers/css";
import { useAtom, useAtomValue } from "jotai";
import { loggedInAtom } from "./helpers/atoms";
import Home from "./components/views/Home/Home";

const style = StyleSheet.create({
    safe: {
        backgroundColor: cssVar.colors.primary,
        height: '100%',
    }
});

export default function App(): ReactElement {
    const loggedIn = useAtomValue(loggedInAtom);
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={style.safe}>
                { loggedIn ? <Home /> : <Entry /> }
            </SafeAreaView>
        </SafeAreaProvider>
    )
}