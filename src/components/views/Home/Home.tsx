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
        return <ProfilePane
            pfp={require("../../../../assets/logo.png")}
            username="spuckhafte"
            posts={12}
            clg="shiv nadar university"
            likes={500}
        />
    }, []);

    const CollegePaneElement = useMemo(() => {
        return <CollegePane
            img={require("../../../../assets/logo.png")}
            clgName="shiv nadar university"
            members={213}
            clgId="snu.edu.in"
            online={18}
        />
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