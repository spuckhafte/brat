import { ImageStyle, TextStyle, ViewStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

export default {
    colors: {
        otherBlack: "#0f0f0f",
        primary: "black",
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

        absCenter: {
            position: "absolute",
            left: "50%",
            top: "50%",
        } as Style,

        absBottom: {
            position: "absolute",
            top: "100%",
        } as Style,

        absRight: {
            position: "absolute",
            left: "100%",
        } as Style,
    },
};