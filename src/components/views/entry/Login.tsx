import { useSetAtom } from "jotai";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Button from "src/components/util/Button";
import css from "src/helpers/css";
import { entryModeAtom } from "./entry_atoms";
import { useState } from "react";
import { loggedInAtom } from "src/helpers/atoms";


const style = getStyle();

export default () => {
    const setEntryMode = useSetAtom(entryModeAtom);
    const setLocalStorage = useSetAtom(loggedInAtom);
    
    const [email, setEmail] = useState('');
    const [passoword, setPassoword] = useState('');

    function handleModeChangeToSignUp() {
        setEntryMode("signup");
    }

    function handleLogin() {
        setLocalStorage(true);
    }

    return (
        <View style={style.container}>
            <View style={style.inps}>
                <TextInput
                    style={style.input}
                    placeholder="Email"
                    placeholderTextColor={"gray"}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={style.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    value={passoword}
                    onChangeText={setPassoword}
                />
            </View>

            <Button text="LOGIN" onPressOut={handleLogin} />

            <View style={style.changeMode}>
                <Text style={style.changeModeText}>Don't have an account?</Text>

                <TouchableOpacity onPressOut={handleModeChangeToSignUp}>
                    <Text style={style.changeModeLinkText}> Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function getStyle() {
    return StyleSheet.create({
        container: {
            gap: 5,
            marginTop: 20,
            marginHorizontal: 50,
        },
        inps: {
            marginBottom: 10,
            gap: 5,
        },
        input: {
            backgroundColor: "black",
            height: 50,
            borderRadius: 10,
            color: "white",
            paddingHorizontal: 10,
        },
        changeMode: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        },
        changeModeText: {
            color: "gray",
        },
        changeModeLinkText: {
            color: css.colors.lightSecondary,
        },
    });
}