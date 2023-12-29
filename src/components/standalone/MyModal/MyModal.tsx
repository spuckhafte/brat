import { useAtom, useSetAtom } from "jotai"
import { useEffect, useState } from "react";
import { GestureResponderEvent, Modal, StyleSheet, Text, View } from "react-native"
import Button from "src/components/util/Button";
import { modalValueAtom, modalVisibleAtom } from "src/helpers/atoms"
import css from "src/helpers/css";

export default () => {
    const setModalVisible = useSetAtom(modalVisibleAtom);
    const [modalValue, setModaValue] = useAtom(modalValueAtom);

    const [backdropTouched, setBackdropTouched] = useState(false);
    const [modalTouched, setModalTouched] = useState(false);

    function closeModal() {
        setModalVisible(false);
        setModaValue({ body: "", title: "" });

        if (modalValue.onModalClose) modalValue.onModalClose();
    }

    function pressOkay() {
        if (modalValue.onModalOkay) modalValue.onModalOkay();
        closeModal();
    }

    useEffect(() => {
        if (backdropTouched && !modalTouched) {
            closeModal();
            if (modalValue.onModalCloseWithoutOkay)
                modalValue.onModalCloseWithoutOkay();
        }
        else {
            if (!backdropTouched && !modalTouched)
                return;

            setBackdropTouched(false);
            setModalTouched(false);
        }
    }, [backdropTouched, modalTouched]);


    return <Modal
        transparent={true}
        animationType="fade"
        hardwareAccelerated={true}
        onRequestClose={closeModal}
    >
        <View style={style.modalContainer} onTouchEnd={() => setBackdropTouched(true)}>
            <View style={style.modal} onTouchEnd={() => setModalTouched(true)}>
                <View style={style.modalContent}>
                    <Text style={style.errorTitle}>{modalValue.title}</Text>
                    {/* {
                        modalValue.input && <TextInput {...modalValue.input} />
                    } */}
                    {
                        modalValue.body && (
                            modalValue.noTextForBody ?
                                <modalValue.body /> :
                                <Text style={style.errorBody}>
                                    {
                                        typeof modalValue.body === "string"
                                            ? modalValue.body
                                            : <modalValue.body />
                                    }
                                </Text>
                        )
                    }
                </View>
                <Button
                    text="OK"
                    styling={style.okBtn}
                    textStyle={style.okBtnText}
                    onPressOut={pressOkay}
                />
            </View>
        </View>
    </Modal>
}

const style = StyleSheet.create({
    modalContainer: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(200, 200, 200, 0.1)"
    },

    modal: {
        backgroundColor: css.colors.primary,
        paddingTop: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        borderRadius: 10,
    },
    modalContent: {
        gap: 5,
        width: 250,
    },
    errorTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
    },
    errorBody: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
    },
    okBtn: {
        backgroundColor: "transparent",
        width: 300,
        borderRadius: 0,
        borderTopWidth: 1,
        borderTopColor: css.colors.lightPrimary,
        height: 45,
    },
    okBtnText: {
        color: css.colors.lightSecondary,
        fontWeight: "bold",
        fontSize: 18,
    },
})