import { ImageStyle, TextStyle, ViewStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

export default {
    colors: {
        primary: "#0F0F0F",
        lightPrimary: "#232D3F",
        secondary: "#005B41",
        lightSecondary: "#008170",
    },

    mixins: {
        flexCenter: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        } as Style,

        btnDark: {
            backgroundColor: "#232D3F",
            height: 35,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        } as Style,

        test: (color="red") => new Object({
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: color
        }) as Style,
    },
};