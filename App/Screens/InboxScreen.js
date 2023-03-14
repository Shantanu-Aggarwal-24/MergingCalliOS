import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const iconTop = Dimensions.get('window').height - 200;
const iconLeft = Dimensions.get('window').width - 80;

function InboxScreen({ navigation }) {
    const [data1, setData1] = useState([]);
    const [contact, setContact] = useState()
    const notificationListener = useRef();
    const baseUrl  = ""

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            getChatData();
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
        };
    }, [])

    const newMessageHandler = (item) => {
        setData1([...data1, item]);
    }

    useEffect(() => {
        getChatData();
    }, [])

    const getChatData = async function () {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            const res = await axios.get(baseUrl+`/api/me/contacts?search=`,
                {
                    headers: {
                        'x-auth-token': token
                    }
                })
            // console.log(JSON.stringify(res.data.data, null, '\t'))
            setData1(pre => [...pre, ...res.data.data])
            // let len = res.data.data.length
            // // console.log(len)
            // const spArr = []
            // for (let i = 0; i < res.data.data.length; i++) {
            //     // console.log(i)
            //     const ind = data.find(ele => ele.messages.find(el=>el._id === '63dca436a56385738bab659e'))

            //     if(typeof ind  === 'number'){
            //         console.log(ind)
            //     }

            //     spArr.push(data[ind])
            //     // data.splice(ind, 1)
            //     setData(pre => [...pre,...data.splice(ind,1)])
            // }

            // console.log('Special messasges Array data',JSON.stringify(spArr))

        } catch (error) {
            console.log('error while getting chats ', error)
        }
    }

    // var len = res.data.data.messages.length()
    // baseUrl+.'api/me/contacts?search='   Link for backend Chat api

    // const getChatData = async function () {
    //     const payload = {
    //         To: '+19035013305'
    //     }
    //     await fetch('https://2d9f-3-139-109-42.ngrok.io/api/getChatData', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'x-auth-token': AsyncStorage.getItem('token')
    //         },
    //         //   body: JSON.stringify(payload)
    //     })
    //         .then(res => {
    //             res.json()
    //             console.log(res.json())
    //         })
    //         .then(data => {
    //             setData(data.chat);
    //             console.log(JSON.stringify(data))
    //         }).catch(err => console.log(err))
    // }

    const fetchMoreData = () => {
        console.log("calling chat contacts api")
        setContact(pre => pre + 1)
    }

    return (

        <View style={styles.Container}>
            <FlatList

                data={data1}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        key={item._id}
                        onPress={() => navigation.navigate('InboxDetailsScreen', item)}
                    // onShowUnderlay={separators.highlight}
                    // onHideUnderlay={separators.unhighlight}
                    >


                        <View style={styles.messageContainer} >
                            <View style={styles.icon}>
                                <FontAwesome5 style={styles.innerIcon} name="user" size={25} color="#b3afaf" backgroundColor="#d4d0c7" />
                            </View>
                            <View style={styles.text}>
                                <Text style={{ fontWeight: 'bold' }}>{item.sender}</Text>
                                {item.messages && item.messages.length > 0 ? (
                                    <Text style={{ color: '#696b6a' }}>{item.messages[item.messages.length - 1]['body']}</Text>
                                ) : (
                                    <Text>start a conversation</Text>
                                )}
                            </View>
                            <FontAwesome name="angle-right" size={24} color="#b3afaf" />

                        </View>
                    </TouchableHighlight>
                )}
                onEndReached={fetchMoreData}
            />

            <TouchableOpacity style={styles.messageIcon} onPress={() => navigation.navigate('NewMessageScreen', { onPress: newMessageHandler })}>
                <EvilIcons name="plus" size={65} color="#1970e2" />
            </TouchableOpacity>
        </View>

    );


   

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        // backgroundColor:"#fff",
        // flexDirection:'column'
    },
    messageContainer: {
        flexDirection: 'row',
        height: 70,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: .17,
        borderColor: "#4f4c4c",
    },
    icon: {
        borderRadius: 20,
        marginLeft: 10,
        backgroundColor: "#f2f0f0",
        width: 40,
        height: 40,
    },
    innerIcon: {
        top: 6,
        left: 9
    },
    text: {
        marginLeft: 10,
        flex: 1,
    },
    messageIcon: {
        position: "absolute",
        top: iconTop,
        left: iconLeft
    }
})

export default InboxScreen;
