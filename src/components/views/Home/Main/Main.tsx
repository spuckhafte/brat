import { FlatList, StyleSheet, View } from "react-native"
import Take from "src/components/util/Take"
import { useAtom, useAtomValue } from "jotai";
import { takesAtom, userDetailsAtom } from "src/helpers/atoms";

export default () => {
    const [takes, _setTakes] = useAtom(takesAtom);
    const userDetails = useAtomValue(userDetailsAtom);


    return (
        <View style={style.container}>
            <FlatList 
                data={takes}
                renderItem={({item}) => <Take 
                    {...item} 
                    sessionId={userDetails?.sessionId as string}  
                />}
                style={style.list}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        
    },
    list: {
        marginTop: 10,
        marginBottom: 60,
    }
});
