import { useSetAtom } from "jotai";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Button from "src/components/util/Button";
import css from "src/helpers/css";
import { entryModeAtom } from "./entry_atoms";
import { useState } from "react";
import { loggedInAtom, modalValueAtom, modalVisibleAtom, takesAtom, userDetailsAtom } from "src/helpers/atoms";
import { socket } from "src/helpers/socket";
import useSocket from "src/helpers/hooks/useSocket";
import { DataOnEntry } from "server/types";
import EmailValidator from "email-validator";
import passwordValidtor from "src/helpers/passwordValidator";
import { parseAllTakes } from "src/helpers/takeParser";

export default () => {
    const setEntryMode = useSetAtom(entryModeAtom);
    const setLoggedIn = useSetAtom(loggedInAtom);
    const setModalValue = useSetAtom(modalValueAtom);
    const setModalVisible = useSetAtom(modalVisibleAtom);
    const setUserDetails = useSetAtom(userDetailsAtom);
    const setTakes = useSetAtom(takesAtom);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleModeChangeToSignUp() {
        setEntryMode("signup");
    }

    function handleLogin() {
        if (
            !EmailValidator.validate(email) ||
            !passwordValidtor.validate(password)
        ) {
            setModalValue({
                title: "Login Failed",
                body: "Invalid credentials",
            });
            setModalVisible(true);
            return;
        }

        socket.emit("login", {
            mail: email,
            password,
        });
    }

    useSocket({
        mainEvent: "login",

        onErr: (err: string) => {
            setModalValue({
                title: "Login Failed",
                body: err,
            });
            setModalVisible(true);
        },
        onDone: (data: DataOnEntry) => {
            setUserDetails({
                user: data.user,
                clg: data.clg,
                sessionId: data.sessionId
            });
            setTakes(parseAllTakes(data.takes));
            setLoggedIn(true);
        },

        otherEvents: {
            onAwait: (userMail: string) => {
                setModalValue({
                    title: "End Active Session",
                    body: "A session is already active on some other device, end it?",
                    onModalOkay: () => {
                        socket.emit("autoLogin", userMail, true); // forced
                        socket.emit("loginContinue", userMail, true);
                    },
                    onModalCloseWithoutOkay: () => {
                        socket.emit("loginContinue", userMail, false);
                    }
                });
                setModalVisible(true);
            }
        }
    });

    useSocket({
        mainEvent: "autoLogin",

        onErr: () => { },

        onDone: (data: DataOnEntry) => {
            setUserDetails({
                user: data.user,
                clg: data.clg,
                sessionId: data.sessionId
            });
            setTakes(parseAllTakes(data.takes));
            setLoggedIn(true);
        }
    });

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
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Button
                text="LOGIN"
                onPressOut={handleLogin}
                textStyle={{
                    fontSize: 16.5,
                    fontWeight: "700",
                }}
            />

            <View style={style.changeMode}>
                <Text style={style.changeModeText}>Don't have an account?</Text>

                <TouchableOpacity onPressOut={handleModeChangeToSignUp}>
                    <Text style={style.changeModeLinkText}> Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
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
