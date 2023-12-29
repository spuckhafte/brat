import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "src/components/util/Button";
import css from "src/helpers/css";
import { entryModeAtom } from "./entry_atoms";
import { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { loggedInAtom, modalValueAtom, modalVisibleAtom, otpAtom, sessionIdAtom } from "src/helpers/atoms";
import passwordValidtor from "src/helpers/passwordValidator";
import { socket } from "src/helpers/socket";
import useSocket from "src/helpers/hooks/useSocket";

const MIN_USERNAME_LEN = 6;
const MAX_USERNAME_LEN = 64;

export default () => {
    const setEntryMode = useSetAtom(entryModeAtom);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const setModalVisible = useSetAtom(modalVisibleAtom);
    const setModalValue = useSetAtom(modalValueAtom);
    const setOtp = useSetAtom(otpAtom);
    const setSessionId = useSetAtom(sessionIdAtom);
    const setLoggedIn = useSetAtom(loggedInAtom);

    function handleModeChangeToLogin() {
        setEntryMode("login");
    }

    function handleSignup() {
        if (!EmailValidator.validate(email)) {
            setModalValue({
                title: "Signup Failed",
                body: "The provided mail is invalid"
            });
            setModalVisible(true);
            return;
        }

        if (username.length < MIN_USERNAME_LEN || username.length > MAX_USERNAME_LEN) {
            if (username.length < MIN_USERNAME_LEN)
                setModalValue({
                    title: "Signup Failed",
                    body: `Username should be of atleast ${MIN_USERNAME_LEN} characters`
                });
            else
                setModalValue({
                    title: "Signup Failed",
                    body: `Username should be of at-max ${MAX_USERNAME_LEN} characters`
                });
            setModalVisible(true);
            return;
        }

        const passwordCasesFailed = passwordValidtor.validate(
            password,
            { details: true, list: true },
        ) as { message: string }[];

        if (passwordCasesFailed.length !== 0) {
            setModalValue({
                title: "Signup Failed",
                body: passwordCasesFailed[0].message,
            });
            setModalVisible(true);
            return;
        }

        type UserForSignUp = {
            username: string;
            mail: string;
            password: string;
        }
        const emitUser: UserForSignUp = {
            username,
            mail: email,
            password,
        }

        socket.emit("register", emitUser);
    }


    useSocket(() => {
        function onError(err: string) {
            setModalValue({
                title: "Signup Failed",
                body: err,
            });
            setModalVisible(true);
        }

        function onOtp() {
            setModalValue({
                title: "Enter OTP",
                body: () => {
                    const [otp, setOtp] = useAtom(otpAtom);
                    return <>
                        <View>
                            <TextInput
                                style={style.otpModalInput}
                                placeholder="Sent to your mail"
                                placeholderTextColor={"gray"}
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType={Platform.OS == "android" ? "numeric" : "number-pad"}
                            />
                        </View>
                    </>
                },
                onModalOkay: () => {
                    setOtp(otp => {
                        socket.emit("verifyOtp", otp);
                        return "";
                    });
                },
            });
            setModalVisible(true);
        }

        function onDone(sessionId: string) {
            console.log("done: " + sessionId);
            setSessionId(sessionId);
            setLoggedIn(true);
        }

        socket.on("registerErr", onError);
        socket.on("registerOtp", onOtp);
        socket.on("registerDone", onDone);

        return () => {
            socket.off('registerErr', onError);
            socket.off('registerOtp', onOtp);
            socket.off('registerDone', onDone);
        };
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
                    value={password}
                    onChangeText={setPassword}
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
    otpModalInput: {
        borderWidth: 2,
        borderColor: css.colors.secondary,
        padding: 2,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginTop: 4,
        color: "white",
        width: 150,
    },
});
