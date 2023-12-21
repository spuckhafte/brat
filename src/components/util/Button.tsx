import { StyleSheet, Text, TouchableOpacity } from "react-native"
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

export default ({ text, onPressOut, borderRadius }: { 
    text: string,
    onPressOut?: (() => void),
    borderRadius?: number
}) => {
    return (
        <TouchableOpacity style={style.btn} onPressOut={onPressOut}>
            <Text style={style.btnText}>{text}</Text>
        </TouchableOpacity>
    )
}