import { useSetAtom } from "jotai";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "src/components/util/Button";
import css from "src/helpers/css";
import { entryModeAtom } from "./entry_atoms";
import { useState } from "react";


const style = getStyle();

export default () => {
    const setEntryMode = useSetAtom(entryModeAtom);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [passoword, setPassoword] = useState('');

    function handleModeChangeToLogin() {
        setEntryMode("login");
    }

    function handleSignup() {
        // signup
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
                    placeholder="Username" 
                    placeholderTextColor={"gray"} 
                    value={username}
                    onChangeText={setUsername}
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

            <Button text="SIGNUP" onPressOut={handleSignup} />

            <View style={style.changeMode}>
                <Text style={style.changeModeText}>Already have an account?</Text>
        
                <TouchableOpacity onPressOut={handleModeChangeToLogin}>
                    <Text style={style.changeModeLinkText}> Login</Text>
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
            backgroundColor: css.colors.otherBlack,
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