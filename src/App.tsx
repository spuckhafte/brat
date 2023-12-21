import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Entry from "./components/views/entry/Entry";
import cssVar from "./helpers/css";

const style = StyleSheet.create({
    safe: {
        backgroundColor: cssVar.colors.primary,
        height: '100%',
        color: "white",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
});

export default function App(): ReactElement {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={style.safe}>
                <Entry />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}