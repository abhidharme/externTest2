
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,

} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

function App() {

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("--------------------userInfo", userInfo.user.email)
      setEmail(userInfo.user.email)

      GoogleSignin.getTokens().then((res) => { console.log(res.accessToken); setToken(res.accessToken) });


    } catch (error) {
      console.log(error.message)
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setEmail("");
      setToken("")
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:"#fff" }}>

     {email == ""  ?
     <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      //disabled={this.state.isSigninInProgress}
      />
      :
      <TouchableOpacity style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center' , backgroundColor:'#4285f4' , borderRadius:3 ,   }} onPress={signOut}>
      <GoogleSigninButton
        style={{ width: 47, height: 47 }} />
      <Text style={{color:'white' , fontWeight:'700' , backgroundColor:'#4285f4' , paddingHorizontal:20 , paddingVertical:10 }}>Sign out</Text>
      </TouchableOpacity>}
     

      <View style={{ width: "100%", paddingHorizontal: 20, alignSelf: 'center', marginTop: 25, backgroundColor: '#fff' }}>
        <Text style={{ color: "black", marginVertical: 20 }}>Email: {email}</Text>
        <Text style={{ color: "black", marginVertical: 20 }}>AccessToken: {token}</Text>
      </View>
    </View>
  );

}



export default App;
