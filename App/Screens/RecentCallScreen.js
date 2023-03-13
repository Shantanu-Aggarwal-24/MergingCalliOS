import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, Button, Pressable, Linking, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { Icon } from '@rneui/themed'
import moment from 'moment';
import Screen from '../components/Screen'
import { FaUserTie } from "react-icons/fa"
import { FlowValidateInstance } from 'twilio/lib/rest/studio/v2/flowValidate';
import { missedcall, incoming, outgoing } from '../../assets/index'


function RecentCallScreen(props) {
    const [calldata, setCallData] = useState([]);
    const [page, setPage] = useState(1);
    const [arrowtouch, setArrowTouch] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const baseUrl = ""
    useEffect(() => {
        getCalls();

    }, [page]);


    const icm = missedcall
    const ico = outgoing
    const ici = incoming

    const openURI = async (recUrl) => {
        const url = recUrl
        const supported = await Linking.canOpenURL(url) //It will open the URL in browseer
        if (supported) {
            await Linking.openURL(url)
        } else {
            Alert.alert("Url can't be opened..please restart the App");
        }
    }


    const getCalls = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token);
            const res = await axios.get(`${baseUrl}api/me/voice?offset=${page}`,
                {
                    headers: {
                        'x-auth-token': token
                    }
                })
            // console.log(JSON.stringify(res.data.data, null, '\t'))
            // console.log(res.data.data[0]['_id']);

            setCallData(pre => [...pre, ...res.data.data]);

        } catch (error) {
            console.log('error while getting call logs', error);
        }
    }

    const fetchMoreData = () => {
        console.log("calling new api")
        setPage(pre => pre + 1);
    }
    return (
        <Screen>


            <View style={styles.Container}>
                <Text style={styles.heading}>Recent calls </Text>
                <FlatList
                    data={calldata}
                    renderItem={({ item, index }) => {
                        return <><View style={styles.call} key={item._id} >
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                accessible={true}>
                                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/552/552721.png" }}
                                    style={{ width: 30, height: 30 }} />
                                {item.direction == "Inbound" ? (
                                    <Text style={{ fontSize: 19, marginLeft: 10 }}>{item.from}</Text>
                                ) : (
                                    <Text style={{ fontSize: 19, marginLeft: 10 }}>{item.to}</Text>
                                )}

                                <Image style={styles.calltypeicon}
                                    source={item.status == 'no-answer' ? (
                                        item.direction == 'Inbound' ? (icm) : (ico)
                                    ) : (item.direction == 'Inbound' ? (ici) : (ico))} />

                                {selectedId == '' ? (
                                    <Icon style={{ marginLeft: 20 }} name='infocirlceo' type='antdesign' size={18}
                                        color='black' onPress={() => {
                                            setSelectedId(item._id)
                                            console.log('seleted id is ' + item._id)
                                        }} />
                                ) : (
                                    (item._id == selectedId ? (
                                        <Icon style={{ marginLeft: 20 }} name='cross' type='entypo' size={20}
                                            color='black' onPress={() => setSelectedId('')} />
                                    ) : (
                                        <Icon style={{ marginLeft: 20 }} name='infocirlceo' type='antdesign' size={18}
                                            color='black' />))
                                )}

                            </View>


                            <Text style={{ marginLeft: 45, fontSize: 18 }}>{item.status}  {moment.parseZone(item.createdAt).local(true).format("MMM DD h:mm a")}</Text>

                            {item._id == selectedId ? (
                                <View style={{ marginLeft: 45, backgroundColor: 'offwhite', marginTop: 10 }}>
                                    {item.direction == 'Inbound' ?
                                        <Text style={{ fontSize: 16 }}>To:{item.to}
                                        </Text> : <Text style={{ fontSize: 16 }}>From:{item.from}</Text>}
                                    <Text style={{ fontSize: 16 }}>
                                        Duration: {item.duration} sec
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        At: {moment.parseZone(item.createdAt).local(true).format("MMM D, YYYY h:mm a")}
                                    </Text>

                                    <Pressable style={{ fontSize: 18 }} onPress={openURI(item.RecordingUrl)}>
                                        <Text > RecordingUrl: Click Here</Text>
                                    </Pressable>

                                </View>
                            ) : (
                                <></>
                            )}


                        </View>
                        </>

                    }}
                    // keyExtractor={item => item._id}  //without math.random()
                    onEndReachedThreshold={0.2}
                    onEndReached={fetchMoreData}
                />

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    Container: {
        margin: 10
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000000",
        marginTop: 10,
        marginBottom: 10
    },
    call: {
        margin: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    calltypeicon: {
        width: 20,
        height: 20,
        marginLeft: 100
    }
})

export default RecentCallScreen;




{/* {
                                item.status === 'no-answer'?(item.direction ==='Inbound'?(
                                <Image source={icm} style={styles.calltypeicon}/>
                                ):(
                                <Image source={ico} style={styles.calltypeicon}/>
                                )):(item.direction === 'Inbound'?(
                                <Image source={ici} style={styles.calltypeicon}/>
                                ):(
                                <Image source={ico} style={styles.calltypeicon}/>
                                ))
                               }  */}
