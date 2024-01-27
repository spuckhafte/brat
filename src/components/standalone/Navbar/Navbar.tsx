import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBuilding, faCross, faPlus, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Image } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import { View } from "react-native"
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
            
            body: () => <View style={style.newTakeContainer}>
                <TouchableOpacity style={style.newTakeCancel}>
                    <FontAwesomeIcon
                        icon={faX}
                        color="white"
                        size={20} 
                    />
                </TouchableOpacity>

                <TextInput
                    placeholder="Title"
                    placeholderTextColor={"gray"}
                    style={style.newTakeTitleInput}
                    multiline
                    autoFocus
                />

                <View style={style.newTakeMain}>
                    <View style={style.clgPfpContainer}>
                        <Image 
                            source={{ 
                                uri: userDetails?.clg.pfp 
                            }}
                            style={style.clgPfp}
                        />
                    </View>
                    <View style={style.newTakeBody}>
                        <Text style={style.clgName}>{userDetails?.clg.name}</Text>
                        <TextInput
                            placeholder="Your hot take..."
                            placeholderTextColor={"gray"}
                            style={style.newTakeBodyInput}
                            multiline
                        />
                    </View>
                </View>
            </View>
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
    },

    newTakeTitleInput: {
        fontSize: 28,
        paddingHorizontal: 10,
        color: "white",
        fontWeight: "bold",
    },

    newTakeMain: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 10,
        height: 50,
    },

    clgPfpContainer: {
        flex: 1,
        ...css.mixins.flexCenter,
    },

    clgPfp: {
        aspectRatio: 1,
        height: "100%",
        borderRadius: 100,
    },

    newTakeBody: {
        display: "flex",
        flex: 7,
        //width: "100%",
        //...css.mixins.test(),
    },

    clgName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize",
    },

    newTakeBodyInput: {
        fontSize: 18,
        color: "white",
        textAlign: "left",
        width: "100%",
        maxHeight: 100,
        ...css.mixins.test(),
    },

});
