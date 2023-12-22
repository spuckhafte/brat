import { StyleSheet, Text, View } from "react-native"
import Navbar from "src/components/standalone/Navbar/Navbar";
import css from "src/helpers/css";

const style = getStyle();

export default () => {
    return (
        <View style={style.container}>
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