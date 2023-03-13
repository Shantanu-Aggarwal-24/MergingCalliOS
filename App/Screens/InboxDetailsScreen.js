import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sendMessage } from '../apiCalls/pushNotification';
// import {socket} from 'socket.io'
import axios from 'axios';
import { TabRouter } from '@react-navigation/native';

const Top = Dimensions.get('window').height - 500;

function InboxDetailsScreen({ route, navigation }) {
    const [message, setMessage] = useState('')
    const [data, setData] = useState(route.params.messages);
    const [dataSent, setDataSent] = useState(false)
    const scrollViewRef = useRef();
    const notificationListener = useRef();
    const token = AsyncStorage.getItem("token");
    const baseUrl = ""

    // useEffect(() => {
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         setData([...route.params.messages,
    //         {  id:notification.request.content._id , 
    //             direction: 'Inbound', 
    //             body: notification.request.content.body 
    //         }]);
    //     });

    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //     };
    // }, [])
    const sendMessageHandler = () => {
        try {
            if (message.trim()) {
                // let newMessage = {
                //     direction: 'outbound-api',
                //     body: message.trim()
                // }
                // setData([...data, newMessage])
                const datasends = sendMessage(route.params.sender, message, route.params.number);
            //     if (datasends.data == 'Sent') {
            //         socket.once('messages',async(dt)=>{
            //             console.log(dt)
            //             if(dt){
            //                 let msg = await axios({
            //                     method:'get',
            //                     url:baseUrl+'api/me/message?id=' + route.params._id,
            //                     headers:{
            //                        'x-auth-token':await  AsyncStorage.getItem('token') 
            //                     }
            //                 })
            //                 setData(msg)
            //             }
            //         })
            //         // setDataSent(true)
            //         // setData([route.params.messages])
            //     }
                 setMessage('');
             }

        } catch (error) {
            console.log("error coming from send message", error)
        }
    }

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    return (
        <View>
            <ScrollView style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {data.map((item, index) => {
                    return (
                        <Text key={index} style={[styles.messages, item.direction === "Inbound" ? { alignSelf: 'flex-start', marginLeft: 12, marginTop: 10, borderRadius: 10, overflow: 'hidden' } : { alignSelf: "flex-end", marginRight: 12, backgroundColor: 'blue', color: 'white', borderRadius: 10, marginTop: 10, overflow: 'hidden' },
                        index === 0 ? { marginTop: 10 } : ''
                        ]}>
                            {item.body}
                        </Text>



                        //    <>
                        //    <Text style={[styles.messages,{alignSelf:'flex-end',marginRight:12,marginTop:10,backgroundColor:'blue',textDecorationColor:'white'}]}>
                        //       Hi! How are You?
                        //    </Text>
                        //    <Text style={[styles.messages,{alignSelf:'flex-start',marginLeft:12}]}>
                        //       I am fine.
                        //    </Text>
                        //    <Text style={[styles.messages,{alignSelf:'flex-end',marginRight:12,backgroundColor:'blue',textDecorationColor:'white'}]}>
                        //       I am aslo fine.
                        //    </Text>
                        //    </>
                    )

                })
                }
                {/* {
                        dataSent == true ? (
                            <Text style={[styles.messages, { alignSelf: "flex-end", marginRight: 12, backgroundColor: 'blue', color: 'white', borderRadius: 10, marginTop: 10, overflow: 'hidden' }]}>
                                {message}
                                {() => setMessage("")}
                            </Text>
                        ) : (<></>)
                    } */}

            </ScrollView>
            <View style={styles.input}>
                <TextInput style={{ flex: 1 }} placeholder="message"
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <TouchableOpacity onPress={sendMessageHandler}>
                    <FontAwesome name="send" size={24} color="#1970e2" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    messages: {
        backgroundColor: '#d9d9d9',
        padding: 5,
        margin: 2,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        fontSize: 15
    },
    input: {
        borderWidth: 1,
        borderColor: '#1970e2',
        margin: 10,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    scrollView: {
        height: '89%'
    }
})

export default InboxDetailsScreen;
