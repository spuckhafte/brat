import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import css from "src/helpers/css"

export default ({ text, onPressOut, styling, textStyle, noText, id }: {
    text: string | JSX.Element,
    onPressOut?: (() => void),
    styling?: ViewStyle,
    textStyle?: TextStyle,
    noText?: boolean,
    id?: string
}) => {
    styling = styling ? styling : {};
    textStyle = textStyle ? textStyle : {};
    return (
        <TouchableOpacity style={{ ...style.btn, ...styling }} onPressOut={onPressOut} testID={id}>
            {
                noText
                    ? text
                    : <Text
                        style={{
                            ...style.btnText,
                            ...textStyle
                        }}>
                        {text}
                    </Text>
            }
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    btn: {
        ...css.mixins.btnDark,
    },
    btnText: { color: "white" }
});