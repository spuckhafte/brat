import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { btnForClgPaneClickedAtom, collegePaneStatusAtom } from "src/helpers/atoms";
import Animated, { runOnJS, useSharedValue, withSpring } from "react-native-reanimated";
import css from "src/helpers/css";

const EXTREME_LEFT = -304;
const EXTREME_RIGHT = 0;

export default (props: {
    img: any,
    clgName: string,
    clgId: string,
    online: number,
    members: number,
}) => {
    const setCollegePaneStatus = useSetAtom(collegePaneStatusAtom);
    const btnForClgPaneClicked = useAtomValue(btnForClgPaneClickedAtom);
    const paneXTransform = useRef(useSharedValue(EXTREME_RIGHT)).current;

    function paneAnimation() {
        const dirn = paneXTransform.value == EXTREME_LEFT ? ">>" : "<<";

        paneXTransform.value = withSpring(
            dirn == ">>" ? EXTREME_RIGHT : EXTREME_LEFT,
            {
                duration: 300,
                dampingRatio: 1
            },
            () => {
                if (dirn == ">>")
                    runOnJS(setCollegePaneStatus)("hide");
                else runOnJS(setCollegePaneStatus)("show");
            },
        );
    }

    useEffect(() => {
        paneAnimation();
    }, [btnForClgPaneClicked]);


    return (
        <Animated.View
            style={{
                ...style.container,
                left: "100%",
                transform: [{ translateX: paneXTransform }],
            }}
            id="nav"
        >
            <Image
                source={props.img}
                style={style.img}
            />
            <View style={style.data}>
                <Text style={style.name}>{props.clgName}</Text>
                <Text style={style.clgId}>{props.clgId}</Text>
                <View style={style.info}>
                    <View style={style.infoType}>
                        <Text style={style.value}>{props.online}</Text>
                        <Text style={style.valueDesc}>online</Text>
                    </View>
                    <View style={style.infoType}>
                        <Text style={style.value}>{props.members}</Text>
                        <Text style={style.valueDesc}>total</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: css.colors.primary,
        position: "absolute",
        width: 304,
        height: "100%",

        borderTopLeftRadius: 25,

        shadowColor: "white",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 10,

        display: "flex",
        alignItems: "center",

        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 10,
    },

    img: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderColor: css.colors.lightPrimary,
        borderWidth: 3,
        marginBottom: 25,
    },
    data: {
        display: "flex",
        alignItems: "center",
        backgroundColor: css.colors.otherBlack,
        paddingVertical: 25,
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    clgId: {
        color: css.colors.lightSecondary,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 25,
    },

    info: {
        gap: 2.5,
    },
    infoType: {
        width: 69,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
    },
    valueDesc: {
        color: css.colors.lightSecondary,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
        textTransform: "uppercase",
    },
});
