import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import Button from "src/components/util/Button";
import { loggedInAtom, profilePaneStatusAtom, profilePaneTransformAtom } from "src/helpers/atoms";
import css from "src/helpers/css";

const style = getStyle();

const EXTREME_LEFT = -80;
const EXTREME_RIGHT = 0;
const SPEED = 10;

export default (props: {
    pfp: any,
    username: string,
    clg: string,
    posts: number,
    likes: number,
}) => {
    const setLoggedIn = useSetAtom(loggedInAtom);
    const [profilePaneStatus, setProfilePaneStatus] = useAtom(profilePaneStatusAtom);
    const [paneLeftTransform, setPaneLeftTransform] = useState(EXTREME_LEFT);

    function paneAnimation(dir: ">>" | "<<") {
        setPaneLeftTransform(previous => {
            if (
                (dir == ">>" && previous >= EXTREME_RIGHT) || 
                (dir == "<<" && previous <= EXTREME_LEFT)
            ) {
                if (dir == "<<")
                    setProfilePaneStatus("hide");
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

        if (profilePaneStatus == "show")
            paneAnimation(">>");
        
        if (profilePaneStatus == "start-hiding")
            paneAnimation("<<");
    }, [profilePaneStatus]);

    function handleLogout() {
        setLoggedIn(false);
        setProfilePaneStatus("hide");
        setPaneLeftTransform(EXTREME_LEFT);
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
                source={props.pfp}
                style={style.pfp}
            />
            <Text style={style.name}>{props.username}</Text>
            <Text style={style.clg}>{props.clg}</Text>
            <View style={style.info}>
                <View style={style.infoType}>
                    <Text style={style.value}>{props.posts}</Text>
                    <Text style={style.valueDesc}>posts</Text>
                </View>
                <View style={style.infoType}>
                    <Text style={style.value}>{props.likes}</Text>
                    <Text style={style.valueDesc}>likes</Text>
                </View>
            </View>
            <View style={style.btnGrp}>
                <Button
                    text="Edit Profile"
                    styling={{ height: 35 }}
                    textStyle={{
                        fontSize: 15,
                        textTransform: "uppercase"
                    }}
                />
                <Button
                    text="Logout"
                    styling={{ height: 35 }}
                    textStyle={{
                        fontSize: 15,
                        textTransform: "uppercase"
                    }}
                    onPressOut={handleLogout}
                />
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
            
            borderTopRightRadius: 25,

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

        pfp: {
            width: 180,
            height: 180,
            borderRadius: 100,
            borderColor: css.colors.secondary,
            borderWidth: 2,
            marginBottom: 25,
        },
        name: {
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
        },

        clg: {
            color: css.colors.lightSecondary,
            fontSize: 18,
            fontWeight: "600",
            textTransform: "uppercase",
            marginBottom: 25,
        },

        info: {
            marginBottom: 25,
            gap: 2.5,
        },
        infoType: {
            width: 70,
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
        btnGrp: {
            width: "100%",
            paddingHorizontal: 50,
            paddingVertical: 10,
            gap: 5,
        }
    });
}