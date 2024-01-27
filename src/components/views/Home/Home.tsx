import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native"
import CollegePane from "src/components/standalone/CollegePane/CollegePane";
import Navbar from "src/components/standalone/Navbar/Navbar";
import ProfilePane from "src/components/standalone/ProfilePane/ProfilePane";
import { collegePaneStatusAtom, profilePaneStatusAtom } from "src/helpers/atoms";
import Main from "./Main/Main";

const style = getStyle();

export default () => {
    const profilePaneStatus = useAtomValue(profilePaneStatusAtom);
    const collegePaneStatus = useAtomValue(collegePaneStatusAtom);

    const ProfilePaneElement = useMemo(() => {
        return <ProfilePane />
    }, []);

    const CollegePaneElement = useMemo(() => {
        return <CollegePane />
    }, []);

    return (
        <View style={style.container}>
            <Main/>
            
            { profilePaneStatus != "hide" && ProfilePaneElement }
            { collegePaneStatus != "hide" && CollegePaneElement }

            <Navbar />
        </View>
    )
}

function getStyle() {
    return StyleSheet.create({
        container: {
            height: "100%",
        }
    })
}