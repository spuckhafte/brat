import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBuilding, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAtom, useSetAtom } from "jotai";
import { StyleSheet, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { profilePaneStatusAtom } from "src/helpers/atoms";
import css from "src/helpers/css";

const style = getStyle();


export default () => {
    const [profilePaneStatus, setProfilePaneStatus] = useAtom(profilePaneStatusAtom);

    function handleProfilePress() {
        if (profilePaneStatus == "start-hiding") 
            return;
            
        setProfilePaneStatus(profilePaneStatus == "show" ? "start-hiding" : "show")
    }

    return (
        <View style={style.nav} id="nav">

            <TouchableOpacity style={style.navIconsOutLine} onPressOut={handleProfilePress}>
                <FontAwesomeIcon icon={faUser} color="white" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine}>
                <FontAwesomeIcon icon={faSearch} color="white" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine}>
                <FontAwesomeIcon
                    icon={faPlus}
                    color={css.colors.lightSecondary}
                    size={35}
                />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine}>
                <FontAwesomeIcon icon={faBell} color="white" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={style.navIconsOutLine}>
                <FontAwesomeIcon icon={faBuilding} color="white" size={22} />
            </TouchableOpacity>

        </View>
    )
}

function getStyle() {
    return StyleSheet.create({
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
            // ...css.mixins.test(),
            paddingHorizontal: 15,
            height: "100%", 
            
            ...css.mixins.flexCenter
        },
    })
}