import { useAtomValue } from "jotai";
import { StyleSheet, Text, View } from "react-native"
import CollegePane from "src/components/standalone/CollegePane/CollegePane";
import Navbar from "src/components/standalone/Navbar/Navbar";
import ProfilePane from "src/components/standalone/ProfilePane/ProfilePane";
import { collegePaneStatusAtom, profilePaneStatusAtom } from "src/helpers/atoms";
import css from "src/helpers/css";

const style = getStyle();

export default () => {
    const profilePaneStatus = useAtomValue(profilePaneStatusAtom);
    const collegePaneStatus = useAtomValue(collegePaneStatusAtom);

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

            {
                (collegePaneStatus == "show" || collegePaneStatus == "start-hiding") &&
                <CollegePane
                    img={require("../../../../assets/logo.png")}
                    clgName="shiv nadar university"
                    members={213}
                    clgId="snu.edu.in"
                    online={18}
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