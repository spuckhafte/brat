import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native"
import CollegePane from "src/components/standalone/CollegePane/CollegePane";
import Navbar from "src/components/standalone/Navbar/Navbar";
import ProfilePane from "src/components/standalone/ProfilePane/ProfilePane";
import { FrontendData, collegePaneStatusAtom, profilePaneStatusAtom, takesAtom, userDetailsAtom } from "src/helpers/atoms";
import Main from "./Main/Main";
import useSocket from "src/helpers/hooks/useSocket";
import { ATake, FrontendUser } from "server/types";
import { parseATake, postLikedStatus } from "src/helpers/takeParser";
import asyncIterator from "src/helpers/asyncIterator";

export default () => {
    const profilePaneStatus = useAtomValue(profilePaneStatusAtom);
    const collegePaneStatus = useAtomValue(collegePaneStatusAtom);
    const [takes, setTakes] = useAtom(takesAtom);
    const [userDetails, setUserDetails] = useAtom(userDetailsAtom);

    useSocket({
        mainEvent: "postNewTake",

        onDone: (post: ATake, updatedAuthor?: FrontendUser) => {
            setTakes(prev => [parseATake(post), ...prev]);
            
            if (updatedAuthor && updatedAuthor.name == userDetails?.user.name && userDetails)
                setUserDetails({
                    ...userDetails,
                    user: updatedAuthor,
                });
            
        },
        onErr: () => {},
    });

    useSocket({
        mainEvent: "updateATake",

        onDone: (updatedPost: Partial<ATake>, updatedAuthor?: FrontendUser) => {
            setTakes(prevTakes => {
                asyncIterator(prevTakes, aTake => {
                    if (aTake._id == updatedPost._id) {
                        for (let key of Object.keys(updatedPost))
                            if (Object.keys(aTake).includes(key))
                                aTake[key] = updatedPost[key];
                       
                        aTake.userPostLikeStatus = postLikedStatus(
                            updatedPost.likedBy, 
                            updatedPost.dislikedBy, 
                            userDetails?.user.name
                        );
                        return true;
                    }
                    return false;
                }, () => {
                    setTakes([ ...prevTakes ]);
                    
                    if (updatedAuthor && updatedAuthor.name == userDetails?.user.name && userDetails)
                        setUserDetails({
                            ...userDetails,
                            user: updatedAuthor,
                        });
                    
                });

                return prevTakes;
            });
        },
        onErr: () => {},
    });


    const ProfilePaneElement = useMemo(() => {
        return <ProfilePane />
    }, []);

    const CollegePaneElement = useMemo(() => {
        return <CollegePane />
    }, []);

    return (
        <View style={style.container}>
            <Main/>
            
            { profilePaneStatus != "hide" && ProfilePaneElement }
            { collegePaneStatus != "hide" && CollegePaneElement }

            <Navbar />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: "100%",
    }
});
