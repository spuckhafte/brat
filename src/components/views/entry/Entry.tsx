import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "src/components/util/Button";
import css from "src/helpers/css";
import Login from "./Login";
import { useAtom } from "jotai";
import { entryModeAtom } from "./entry_atoms";
import Signup from "./Signup";


const style = getStyle();

export default () => {
    const [entryMode, setEntryMode] = useAtom(entryModeAtom);


    function handleLoginPress() {
        setEntryMode("login");
    }

    function handleSignupPress() {
        setEntryMode("signup");
    }

    return (
        <View>
            <View style={style.branding}>
                <Image
                    source={require("../../../../assets/logo.png")}
                    style={style.brandImg}
                />
                <Text style={style.heading}>Brat</Text>
                <Text style={style.subhead}>be anonymous</Text>
            </View>
            {
                !entryMode ?
                    <View style={style.btnGrp}>
                        <Button text="LOGIN" onPressOut={handleLoginPress} />
                        <Button text="SIGNUP" onPressOut={handleSignupPress} />
                    </View>
                    : (entryMode == "login" ? <Login /> : <Signup />)   
            }
        </View>
    );
}

function getStyle() {
    return StyleSheet.create({
        branding: {
            ...css.mixins.flexCenter,
            flexDirection: "column",
        },
        brandImg: {
            width: 130,
            height: 160,
            transform: [ { scaleX: -1 } ]
        },
        heading: {
            fontSize: 35,
            textTransform: "uppercase",
            color: css.colors.secondary,
            fontWeight: "500",
        },
        subhead: {
            fontSize: 15,
            color: "white",
            fontWeight: "500",
        },
        btnGrp: {
            gap: 10,
            marginTop: 30,
            marginHorizontal: 50,
        },
    });
}