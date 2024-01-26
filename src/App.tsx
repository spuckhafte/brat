import { ReactElement, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Entry from "./components/views/entry/Entry";
import cssVar from "./helpers/css";
import { useAtomValue, useSetAtom } from "jotai";
import { loggedInAtom, modalVisibleAtom, userDetailsAtom } from "./helpers/atoms";
import Home from "./components/views/Home/Home";
import MyModal from "./components/standalone/MyModal/MyModal";
import { useNormalSocket } from "./helpers/hooks/useSocket";
import { socket } from "./helpers/socket";

export default function App(): ReactElement {
    const loggedIn = useAtomValue(loggedInAtom);
    const modalVisible = useAtomValue(modalVisibleAtom);
    const setLoggedIn = useSetAtom(loggedInAtom)
    const setUserDetails = useSetAtom(userDetailsAtom);

    useNormalSocket(() => {
        function forceLogout() {
            setLoggedIn(false);
            setUserDetails(null);
        }

        socket.on("force-logout", forceLogout);

        return () => {
            socket.off("force-logout", forceLogout);
        };
    });

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