import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { loggedInAtom, collegePaneStatusAtom } from "src/helpers/atoms";
import css from "src/helpers/css";

const style = getStyle();

const EXTREME_RIGHT = 100;
const EXTREME_LEFT = 20;
const SPEED = 10;

export default (props: {
    img: any,
    clgName: string,
    clgId: string,
    members: number,
    online: number,
}) => {
    const setLoggedIn = useSetAtom(loggedInAtom);
    const [collegePaneStatus, setcollegePaneStatus] = useAtom(collegePaneStatusAtom);
    const [paneLeftTransform, setPaneLeftTransform] = useState(EXTREME_RIGHT);

    function paneAnimation(dir: ">>" | "<<") {
        setPaneLeftTransform(previous => {
            if (
                (dir == ">>" && previous >= EXTREME_RIGHT) ||
                (dir == "<<" && previous <= EXTREME_LEFT)
            ) {
                if (dir == ">>")
                    setcollegePaneStatus("hide");
                return previous;
            } else {
                requestAnimationFrame(() => paneAnimation(dir));
                return previous + (dir == ">>" ? SPEED : -SPEED);
            }
        });
    }

    useEffect(() => {
        if (paneLeftTransform > EXTREME_LEFT && paneLeftTransform < EXTREME_RIGHT)
            return;

        if (collegePaneStatus == "show")
            paneAnimation("<<");

        if (collegePaneStatus == "start-hiding")
            paneAnimation(">>");
    }, [collegePaneStatus]);

    function handleLogout() {
        setLoggedIn(false);
        setcollegePaneStatus("hide");
        setPaneLeftTransform(EXTREME_RIGHT);
    }

    return (
        <View
            style={{
                ...style.container,
                left: `${paneLeftTransform}%`
            }}
            id="nav"
        >
            <Image
                source={props.img}
                style={style.img}
            />
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
    )
}

function getStyle() {
    return StyleSheet.create({
        container: {
            backgroundColor: css.colors.primary,
            position: "absolute",
            width: "80%",
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
        },

        img: {
            width: 180,
            height: 180,
            borderRadius: 100,
            borderColor: css.colors.lightPrimary,
            borderWidth: 3,
            marginBottom: 25,
        },
        name: {
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
            textTransform: "uppercase",
        },

        clgId: {
            color: css.colors.lightSecondary,
            fontSize: 22,
            fontWeight: "600",
            marginBottom: 25,
        },

        info: {
            marginBottom: 25,
            gap: 2.5,
        },
        infoType: {
            // ...css.mixins.test(),
            width: 69,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // gap: 5,
        },
        value: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
        },
        valueDesc: {
            color: css.colors.lightSecondary,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "left",
            width: "100%",
            textTransform: "uppercase",
        },
    });
}