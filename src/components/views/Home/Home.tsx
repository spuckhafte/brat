import { useAtomValue } from "jotai";
import { StyleSheet, Text, View } from "react-native"
import Navbar from "src/components/standalone/Navbar/Navbar";
import ProfilePane from "src/components/standalone/ProfilePane.tsx/ProfilePane";
import { profilePaneStatusAtom } from "src/helpers/atoms";
import css from "src/helpers/css";

const style = getStyle();

export default () => {
    const profilePaneStatus = useAtomValue(profilePaneStatusAtom);

    return (
        <View style={style.container}>
            { 
                (profilePaneStatus == "show" || profilePaneStatus == "start-hiding") && 
                <ProfilePane 
                    pfp={require("../../../../assets/logo.png")}
                    username="spuckhafte"
                    posts={12}
                    clg="shiv nadar university"
                    likes={500}
                />
            }
            
            <Navbar />
        </View>
    )
}

function getStyle() {
    return StyleSheet.create({
        container: {
            // position: "relative",
            height: "100%",
        }
    })
}