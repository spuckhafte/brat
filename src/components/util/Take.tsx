import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import css from "src/helpers/css";
import Button from "./Button";
import { handleGlobalChange } from "src/helpers/handleGlobalChange";
import { beautifyTime } from "src/helpers/takeParser";

export default (props: {
    username: string,
    _id: string,
    sessionId: string,
    time: string,
    title: string,
    body: string,
    likes: number,
    dislikes: number,
    userPostLikeStatus: boolean | null,
}) => {
    const [expandTake, setExpandTake] = useState(false);

    function handleLike() {
        let likeCount = props.likes;
        let dislikeCount = props.dislikes;

        if (!props.userPostLikeStatus) {
            likeCount += 1;

            if (props.userPostLikeStatus === false && props.dislikes != 0)
                dislikeCount -= 1;
        } else {
            if (props.likes != 0)
                likeCount -= 1;
        }

        handleGlobalChange({
            event: "handleLike",
            query: {
                takeId: props._id,
                likes: likeCount,
                dislikes: dislikeCount,
            },
            sessionId: props.sessionId,
        });
    }

    function handleDislike() {
        let likeCount = props.likes;
        let dislikeCount = props.dislikes;

        if (props.userPostLikeStatus == null || props.userPostLikeStatus == true) {
            dislikeCount += 1;

            if (props.userPostLikeStatus == true && likeCount != 0)
                likeCount -= 1;
        } else {
            if (dislikeCount != 0)
                dislikeCount -= 1;
        }

        handleGlobalChange({
            event: "handleLike",
            query: {
                takeId: props._id,
                likes: likeCount,
                dislikes: dislikeCount,
            },
            sessionId: props.sessionId,
        });
    }

    function handlePressOnATake() {
        setExpandTake(prev => !prev);
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.name} numberOfLines={1}>{props.username}</Text>
                <Text style={style.time}>{beautifyTime(props.time) + " ago"}</Text>
            </View>
            <View style={style.content} onTouchEnd={handlePressOnATake}>
                <Text 
                    style={style.title}
                    numberOfLines={expandTake ? undefined : 3}
                >{props.title}</Text>
                <Text
                    style={style.body}
                    numberOfLines={expandTake ? undefined : 2}
                >{props.body}</Text>
            </View>
            <View style={style.footer}>
                <Button
                    text={<>
                        <FontAwesomeIcon icon={faThumbsUp} size={18} color="white" />
                        <Text style={style.likeCount}>{props.likes}</Text>
                    </>}
                    styling={{
                        ...style.like,
                        backgroundColor: (() => {
                            if (props.userPostLikeStatus == null || props.userPostLikeStatus == false)
                                return css.colors.lightPrimary;
                            else return css.colors.secondary;
                        })()
                    }}
                    onPressOut={handleLike}
                    noText={true}
                    id="likeBtn"
                />
                <Button
                    text={<>
                        <FontAwesomeIcon icon={faThumbsDown} size={18} color="white" />
                        <Text style={style.dislikeCount}>{props.dislikes}</Text>
                    </>}
                    styling={{
                        ...style.dislike,
                        backgroundColor: (() => {
                            if (props.userPostLikeStatus == null || props.userPostLikeStatus == true)
                                return css.colors.lightPrimary;
                            else return css.colors.secondary;
                        })()
                    }}
                    onPressOut={handleDislike}
                    noText={true}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: css.colors.otherBlack,
        borderRadius: 25,
        marginHorizontal: 20,
        paddingHorizontal: 25,
        paddingVertical: 15,
        gap: 10,
        marginBottom: 15,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    name: {
        color: css.colors.lightSecondary,
        maxWidth: 150,
        fontSize: 17,
        fontWeight: "bold",
    },
    time: {
        color: css.colors.dullWhite,
        maxWidth: 80,
        fontSize: 13,
    },
    content: {

    },
    title: {
        color: "white",
        fontSize: 22,
        fontWeight: "800",
        paddingBottom: 5,
    },
    body: {
        color: "white",
        fontWeight: "400",
        fontSize: 17
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingTop: 8,
    },
    like: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: css.colors.lightPrimary,
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    dislike: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: css.colors.lightPrimary,
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    likeCount: {
        color: "white",
        fontSize: 18,
    },
    dislikeCount: {
        color: "white",
        fontSize: 18,
    },
});
