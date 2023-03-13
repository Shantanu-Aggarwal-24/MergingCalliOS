import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Screen from '../components/Screen';
import colors from '../../config/colors'
import { sendMessage } from '../apiCalls/pushNotification';

function NewMessageScreen({navigation, route}) {
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" }});
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    
    const sendMessageHandler = () => {
        if(number && message){
            console.log(number, message);
            setNumber('');
            setMessage('');
            route.params.onPress({ 
                to : '+1 903 501 3305',
                from : number,
                messageDetails : [
                    {
                        type : 'send',
                        message : message
                    }
                ]
            })
            sendMessage(number, message);      
            navigation.navigate('InboxScreen')
        }
        
    }
    return (
        <Screen style={styles.Container}>
            <TextInput style={styles.input} placeholder="Contact name, phone number"
                clearButtonMode="always"
                onChangeText={(value) => setNumber(value)}
                value={number}
            />
            <TextInput style={styles.input} placeholder="type your sms"
                clearButtonMode="always"
                multiline
                numberOfLines={10}
                onChangeText={(value) => setMessage(value)}
                value={message}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessageHandler}>
                <Text style={{color : 'white', fontSize : 18}}>Send</Text>
                <FontAwesome name="send" size={24} color="white" />
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    Container : {
        flex : 1,
    },
    input : {
        borderWidth : 2,
        margin : 5,
        borderRadius : 5,
        padding : 4,
        borderColor : "#cccfcd"
    },
    sendButton : {
        flexDirection : "row",
        justifyContent : "space-between",
        margin : 10,
        backgroundColor : colors.primary,
        padding : 12,
        borderRadius : 10,
    }
})

export default NewMessageScreen;