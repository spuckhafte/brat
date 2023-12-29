import { ReactElement, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Entry from "./components/views/entry/Entry";
import cssVar from "./helpers/css";
import { useAtomValue } from "jotai";
import { loggedInAtom, modalVisibleAtom } from "./helpers/atoms";
import Home from "./components/views/Home/Home";
import MyModal from "./components/standalone/MyModal/MyModal";

export default function App(): ReactElement {
    const loggedIn = useAtomValue(loggedInAtom);
    const modalVisible = useAtomValue(modalVisibleAtom);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={style.safe}>
                {modalVisible && <MyModal />}
                {loggedIn ? <Home /> : <Entry />}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const style = StyleSheet.create({
    safe: {
        backgroundColor: cssVar.colors.primary,
        height: '100%',
    },
});