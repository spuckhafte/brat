import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import css from "src/helpers/css";
import Button from "./Button";

const style = getStyle();

export default (props: {
    username: string,
    time: string,
    title: string,
    body: string,
    likes: number,
    dislikes: number,
    userPostLikeStatus: boolean | null,
}) => {
    const [isPostLiked, setIsPostLiked] = useState<boolean | null>(props.userPostLikeStatus);
    const [likeCount, setLikeCount] = useState(props.likes);
    const [dislikeCount, setDislikeCount] = useState(props.dislikes);
    const [expandTake, setExpandTake] = useState(false);

    function handleLike() {
        if (!isPostLiked) {
            setIsPostLiked(true);
            setLikeCount(likeCount + 1);

            if (isPostLiked === false && dislikeCount != 0)
                setDislikeCount(dislikeCount - 1);
        } else {
            setIsPostLiked(null);

            if (likeCount != 0)
                setLikeCount(likeCount - 1);
        }
    }

    function handleDislike() {
        if (isPostLiked == null || isPostLiked == true) {
            setIsPostLiked(false);
            setDislikeCount(dislikeCount + 1);

            if (isPostLiked == true && likeCount != 0)
                setLikeCount(likeCount - 1);
        } else {
            setIsPostLiked(null);

            if (dislikeCount != 0)
                setDislikeCount(dislikeCount - 1);
        }
    }

    function handlePressOnATake() {
        setExpandTake(prev => !prev);
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.name} numberOfLines={1}>{props.username}</Text>
                <Text style={style.time}>{props.time}</Text>
            </View>
            <View style={style.content} onTouchEnd={handlePressOnATake}>
                <Text style={style.title}>{props.title}</Text>
                <Text
                    style={style.body}
                    numberOfLines={expandTake ? undefined : 1}
                >{props.body}</Text>
            </View>
            <View style={style.footer}>
                <Button
                    text={<>
                        <FontAwesomeIcon icon={faThumbsUp} size={18} color="white" />
                        <Text style={style.likeCount}>{likeCount}</Text>
                    </>}
                    styling={{
                        ...style.like,
                        backgroundColor: (() => {
                            if (isPostLiked == null || isPostLiked == false)
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
                        <Text style={style.dislikeCount}>{dislikeCount}</Text>
                    </>}
                    styling={{
                        ...style.dislike,
                        backgroundColor: (() => {
                            if (isPostLiked == null || isPostLiked == true)
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

function getStyle() {
    return StyleSheet.create({
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
}