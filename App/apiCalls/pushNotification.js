import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const sendMessage = async (sender, message, number) => {
  
  try {
    const payload = {
      to: sender,
      from: number,
      body: message
    }
    const baseUrl = ""

    await fetch(baseUrl + '/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': await AsyncStorage.getItem('token')
      },
      body: JSON.stringify(payload)
    }).then(res => {
      res.json()
      console.log("response is",res.json())
    })
      .then(data => {
        console.log("Data is",data)
        return data
      });
    //console.log(resp.json())

  } catch (err) {
    console.log(err)
  }

  console.log('the token is ', await AsyncStorage.getItem('token'));
}


// .then(res => res.json())
// .then(data => {
//   console.log(data);
// }).catch(err => console.log(err))
