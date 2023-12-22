import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { faInfo, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icon } from "@rneui/base";
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import css from "src/helpers/css";

const style = getStyle();


export default () => {
    return (
        <View style={style.nav}>
            <TouchableOpacity style={style.navIconsOutLine}>
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
                <FontAwesomeIcon icon={faInfo} color="white" size={22} />
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
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: css.colors.primary,

            width: "100%",
            ...css.mixins.absBottom,
            transform: [{ translateY: -52 }],
        },
        navIconsOutLine: {
            // fontSize: 30
        },
    })
}