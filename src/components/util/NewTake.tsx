import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import css from "src/helpers/css"
import Button from "./Button"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import { useSetAtom } from "jotai"
import { modalValueAtom, modalVisibleAtom } from "src/helpers/atoms"
import { useState } from "react"

export default () => {
    const setModalVisible = useSetAtom(modalVisibleAtom);
    const setModalValue = useSetAtom(modalValueAtom);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    function handleCancelNewTake() {
        setModalVisible(false);
        setModalValue({ body: "" });
    }

    return <View style={style.newTakeContainer}>

        <TouchableOpacity style={style.newTakeCancel} onPress={handleCancelNewTake}>
            <FontAwesomeIcon
                icon={faX}
                color="white"
                size={20} 
            />

        </TouchableOpacity>

        <ScrollView style={style.newTakeInputs} contentContainerStyle={{ flexGrow: 10 }}>
            <View style={style.newTakeTitle}>
                <TextInput
                    placeholder="Title"
                    placeholderTextColor={"gray"}
                    style={style.newTakeTitleInput}
                    value={title}
                    onChangeText={setTitle}
                    multiline
                    autoFocus
                />
            </View>

            <TextInput
                placeholder="Your hot take..."
                placeholderTextColor={"gray"}
                style={style.newTakeBodyInput}
                value={body}
                onChangeText={setBody}
                multiline
                numberOfLines={5}
            />
        </ScrollView>

        <View style={ style.newTakeBottom }>
            <Button 
                styling={style.newTakePostBtn}
                text={
                    <>
                        <FontAwesomeIcon icon={faComment} color="white"/>
                        <Text style={{ color: "white" }}> Post</Text>
                    </>
                }
                noText={true}
            />
        </View>
    </View>
}

const style = StyleSheet.create({
    newTakeContainer: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 10,
        display: "flex",
        gap: 15,
    },

    newTakeCancel: {
        width: "10%",
        paddingVertical: 10,
        ...css.mixins.flexCenter,
        height: 30,
    },

    newTakeInputs: {
        height: "100%",
        paddingBottom: 5,
        //...css.mixins.test(),
    },

    newTakeTitle: {
        marginVertical: 15,
    },

    newTakeTitleInput: {
        fontSize: 28,
        paddingHorizontal: 10,
        color: "white",
        fontWeight: "bold",
    },

    newTakeBodyInput: {
        fontSize: 18,
        backgroundColor: css.colors.otherBlack,
        marginHorizontal: 10,
        minHeight: 50,
        textAlignVertical: "top",
        padding: 10,
        color: "white",
        borderRadius: 10,
    },

    newTakeBottom: {
        height: 60,
        paddingHorizontal: 10,
    },

    newTakePostBtn: {
        display: "flex",
        flexDirection: "row",
        width: "auto",
        alignSelf: "flex-end",
        paddingHorizontal: 10,
        backgroundColor: css.colors.secondary,
        gap: 3,
    },
});
