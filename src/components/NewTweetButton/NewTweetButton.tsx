import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const NewTweetButton = () => {
    const navigation = useNavigation()

    const onPress = () => {
        navigation.navigate("NewTweet")
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.twitterButton}>
            <EvilIcons name="pencil" size={30} color="white" />
        </TouchableOpacity>
    )
}
export default NewTweetButton

const styles = StyleSheet.create({
    twitterButton: {
        backgroundColor: '#4b36cc', 
        position: 'absolute', 
        bottom: 25, 

        right: 20, 
        borderRadius: 50, 
        width: 50, 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center'


    }

})