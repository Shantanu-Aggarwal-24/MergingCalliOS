import axios from 'axios';
import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Actions } from 'react-native-router-flux';
import Screen from '../components/Screen'
import WelcomeScreen from './WelcomeScreen';
import { useNavigation, StackActions } from '@react-navigation/native';
import Profile from './Profile';
// import Routes from '../navigation/Routes';

function Settings({ navigation }) {
    // const navigation = useNavigation()
    const baseUrl = ""
    const signout = async () => {
        try {
            // const res = await axios.post(baseUrl+'api/auth/signout')
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('email')
            const user = await AsyncStorage.getItem('token')
            if (user === null) {
                Alert.alert("Signout Successfully!!")
            }

            // navigation.dispatch(StackActions.popToTop)
            await navigation.navigate("WelcomeScreen")
            // Actions.WelcomeScreen()
        } catch (error) {
            console.log("error from signout", error)
        }

    }

    const profile =async() =>{
      try{
       await navigation.navigate('Profile')
      }catch(err){
        console.log("error from profile navigation in settings file is",err)
      }
    }

    const contactus = async()=>{
        try{
        await navigation.navigate('ContactUs')
        }catch(er){
            console.log("error from contactus navigation in settings file is",er)
        }
    }

    return (
        <>
            <Screen>
                <View style={styles.container}>
                    {/* <Text style={styles.heading}>Settings</Text> */}
                    <View style={styles.options}>
                        <TouchableOpacity onPress={profile}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start',marginBottom:20 }}>
                                <Image source={require('../../assets/account-details.png')}
                                    style={{ width: 40, height: 40 }} />
                                <Text style={{ marginLeft: 10, fontSize: 20 }}>My Account</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={contactus}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start',marginBottom:20 }}>
                                <Image source={require('../../assets/customer_support.png')}
                                    style={{ width: 30, height: 30 }} />
                                <Text style={{ marginLeft: 10, fontSize: 20 }}>Contact Us</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={signout}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start',marginBottom:20,marginTop:10 }}>
                                <Image source={require('../../assets/logout.png')}
                                    style={{ width: 30, height: 30 }} />
                                <Text style={{ marginLeft: 10, fontSize: 20 }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Screen>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,

    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#000000",
        marginTop: 10,
        marginBottom: 10
    },
    options: {
        margin: 15,
        display: 'flex',
        flexDirection: 'column'
    }
})

export default Settings;
