import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import css from "src/helpers/css"

const style = StyleSheet.create({
    btn: {
        ...css.mixins.btnDark,
    },
    btnText: {
        color: "white",
        fontSize: 16.5,
        fontWeight: "700",
    }
});

export default ({ text, onPressOut, styling, textStyle }: { 
    text: string | JSX.Element,
    onPressOut?: (() => void),
    styling?: ViewStyle,
    textStyle?: TextStyle,
}) => {
    styling = styling ? styling : {};
    textStyle = textStyle ? textStyle : {};
    return (
        <TouchableOpacity style={{...style.btn, ...styling}} onPressOut={onPressOut}>
            <Text style={{ ...style.btnText, ...textStyle }}>{text}</Text>
        </TouchableOpacity>
    )
}