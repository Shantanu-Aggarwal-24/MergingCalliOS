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


    {/*  <View style={styles.Container} > */ }
    {/* <FlatList
                data={[{
                    "messages": [
                        {
                            "_id": "63e35c27a56385738bab6622",
                            "from": "+15096777848",
                            "to": "+919557489282",
                            "body": "hi",
                            "user": "5fbf4921d003672cc0a97669",
                            "status": "delivered",
                            "sid": "SM141fe606a30553b367dadf9b98f6b22a",
                            "direction": "outbound-api",
                            "currentstatus": "Active",
                            "charges": 0.011,
                            "createdAt": "2023-02-08T08:24:07.222Z",
                            "updatedAt": "2023-02-08T08:24:10.668Z",
                            "__v": 0
                        }
                    ],
                    "status": "read",
                    "_id": "614c2d89aca35036f38278a3",
                    "user": "5fbf4921d003672cc0a97669",
                    "sender": "+919557489282",
                    "number": "+16785046580",
                    "createdAt": "2021-09-23T07:32:25.101Z",
                    "updatedAt": "2023-02-08T08:24:07.229Z",
                    "__v": 4
                }, {
                    "messages": [
                        {
                            "_id": "63d76c0938505f743e56f47b",
                            "from": "+18883084511",
                            "to": "+18507883577",
                            "body": "Hi There Testing / Testingg.\nI am a landlord/wholesaler in Florida. You bought and sold some property in Dade before. I BUY/WHOLESALE property in that area.\nCan you please add me to your buyers/ email list? This is my email: 2buyitnow954@gmail.com. Thanks, Rich.\n\n\" \"\nReply with 'NO' to STOP Receiving Messages\"",
                            "user": "5fbf4921d003672cc0a97669",
                            "status": "received",
                            "sid": "SM291e4f8f3ca29047265bcb25f850178c",
                            "direction": "Inbound",
                            "currentstatus": "Unread",
                            "charges": 0.011,
                            "createdAt": "2023-01-30T07:04:41.090Z",
                            "updatedAt": "2023-01-30T07:04:41.090Z",
                            "__v": 0
                        },
                        {
                            "_id": "63d76cc6340f2b7415bbfff6",
                            "from": "+18883084511",
                            "to": "+18507883577",
                            "body": "Hi There Testing / Testingg.\nI am a landlord/wholesaler in Florida. You bought and sold some property in Dade before. I BUY/WHOLESALE property in that area.\nCan you please add me to your buyers/ email list? This is my email: 2buyitnow954@gmail.com. Thanks, Rich.\n\n\" \"\nReply with 'NO' to STOP Receiving Messages\"",
                            "user": "5fbf4921d003672cc0a97669",
                            "status": "received",
                            "sid": "SM41172cd64b0c55648d87980dd0185b48",
                            "direction": "Inbound",
                            "currentstatus": "Unread",
                            "charges": 0.011,
                            "createdAt": "2023-01-30T07:07:50.487Z",
                            "updatedAt": "2023-01-30T07:07:50.487Z",
                            "__v": 0
                        }
                    ],
                    "status": "unread",
                    "_id": "63d76c0938505f743e56f47c",
                    "user": "5fbf4921d003672cc0a97669",
                    "sender": "+18883084511",
                    "number": "+18507883577",
                    "createdAt": "2023-01-30T07:04:41.104Z",
                    "updatedAt": "2023-01-30T07:07:50.502Z",
                    "__v": 1
                }]}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item._id} onPress={() => {
                        navigation.navigate('InboxDetailsScreen', item)
                    }}>
                        {() => console.log(item.sender)}
                        <p>test</p>
                        <View style={styles.messageContainer}>
                            <View style={styles.icon}>
                                <FontAwesome5 style={styles.innerIcon} name="user" size={25} color="#b3afaf" backgroundColor="#d4d0c7" />
                            </View>
                            <View style={styles.text}>
                                <Text style={{ fontWeight: 'bold' }}>{item.sender}</Text>
                                {/* {item.messages && item.messages.length > 0 ? (
                                    <Text style={{ color: '#696b6a' }}>{item.messages[item.messages.length - 1]['body']}</Text>
                                ) : (
                                    <Text>start a conversation</Text>
                                )} */}
    {/* { data !=''?(console.log(item.messages)):(console.log(''))} */ }

    {/* </View> */ }
    {/* <FontAwesome name="angle-right" size={24} color="#b3afaf" /> */ }
    {/* </View> */ }
    {/* </TouchableOpacity> */ }
    {/* )} */ }
    {/* keyExtractor={item => item._id}  //without math.random() */ }
    {/* onEndReachedThreshold={0.2} */ }
    {/* onEndReached={fetchMoreData} */ }

    {/* /> */ }




    {/* <View style={styles.container} >
        //    {data.map((item, index) =>
        // //     (
        // //         <TouchableOpacity key={index} onPress={() => navigation.navigate('InboxDetailsScreen', item)}>
        // //             <View style={styles.messageContainer}>
        // //                 <View style={styles.icon}>
        // //                     <FontAwesome5 style={styles.innerIcon} name="user" size={25} color="#b3afaf" backgroundColor="#d4d0c7" />
        // //                 </View>
        // //                 <View style={styles.text}>
        // //                     <Text style={{ fontWeight: 'bold' }}>{item.from}</Text>
        // //                     <Text style={{ color: '#696b6a' }}>{item.messageDetails[item.messageDetails.length - 1]["message"]}</Text>
        // //                 </View>
        // //                 <FontAwesome name="angle-right" size={24} color="#b3afaf" />
        // //             </View>
        // //         </TouchableOpacity>)
        //    //     )} */}



}

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
