import { faBell, faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBuilding, faCross, faPlus, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Image, ScrollView } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { View } from "react-native"
import Button from "src/components/util/Button";
import NewTake from "src/components/util/NewTake";
import {
    btnForClgPaneClickedAtom,
    btnForProfilePaneClickedAtom,
    collegePaneStatusAtom,
    modalValueAtom,
    modalVisibleAtom,
    profilePaneStatusAtom,
    userDetailsAtom
} from "src/helpers/atoms";
import css from "src/helpers/css";

export default () => {
    const [profilePaneStatus, setProfilePaneStatus] = useAtom(profilePaneStatusAtom);
    const [collegePaneStatus, setCollegePaneStatus] = useAtom(collegePaneStatusAtom);

    const setBtnForClgPaneClicked = useSetAtom(btnForClgPaneClickedAtom);
    const setBtnForProfilePaneClicked = useSetAtom(btnForProfilePaneClickedAtom);
    
    const userDetails = useAtomValue(userDetailsAtom);
    const setModalValue = useSetAtom(modalValueAtom);
    const setModalVisible = useSetAtom(modalVisibleAtom);

    function handleProfilePress() {
        if (collegePaneStatus == "start-showing")
            return;

        if (collegePaneStatus == "show") {
            setCollegePaneStatus("start-hiding");
            setBtnForClgPaneClicked(prev => !prev);
        }

        setProfilePaneStatus(prev => {
            if (prev != "show" && prev != "hide")
                return prev;

            return prev == "hide" ? "start-showing" : "start-hiding";
        });

        setBtnForProfilePaneClicked(prev => !prev);
    }

    function handleCollegePress() {
        if (profilePaneStatus == "start-showing")
            return;

        if (profilePaneStatus == "show") {
            setProfilePaneStatus("start-hiding");
            setBtnForProfilePaneClicked(prev => !prev);
        }

        setCollegePaneStatus(prev => {
            if (prev != "show" && prev != "hide")
                return prev;

            return prev == "show" ? "start-hiding" : "start-showing";
        });

        setBtnForClgPaneClicked(prev => !prev);
    }

    function handleNewTake() {
        setModalValue({
            customFullScreen: true,
            noTextForBody: true,
            
            body: () => <NewTake />
        });
        setModalVisible(true);
    }

    return (
        <View style={style.nav} id="nav">

            <TouchableOpacity style={style.navIconsOutLine} onPressOut={handleProfilePress}>
                <FontAwesomeIcon icon={faUser} color="white" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine}>
                <FontAwesomeIcon icon={faSearch} color="white" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine} onPressOut={handleNewTake}>
                <FontAwesomeIcon
                    icon={faPlus}
                    color={css.colors.lightSecondary}
                    size={35}
                />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine}>
                <FontAwesomeIcon icon={faBell} color="white" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine} onPress={handleCollegePress}>
                <FontAwesomeIcon icon={faBuilding} color="white" size={22} />
            </TouchableOpacity>

        </View>
    )
}

const style = StyleSheet.create({
    nav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: css.colors.primary,

        width: "100%",
        ...css.mixins.absBottom,
        transform: [{ translateY: -52 }],

        elevation: 999,

        borderTopWidth: 0.5,
        borderStyle: "solid",
        borderTopColor: "gray",
    },
    navIconsOutLine: {
        paddingHorizontal: 15,
        height: "100%",

        ...css.mixins.flexCenter
    },
    
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

    spacingForNewTakeInputs: {
        height: 20,
        ...css.mixins.test(),
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
    }

});
