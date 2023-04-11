
import React, { useState } from 'react';
import { View , Text , Button , StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

function App() {
  
  const [email,setEmail] = useState("");
  const [token,setToken] = useState("");

 const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
     console.log("--------------------userInfo" , userInfo)
     setEmail(userInfo.user.email)

     GoogleSignin.getTokens().then((res) => { console.log(res); setToken(res.accessToken)});


    } catch (error) {
     console.log(error.message)
    }
  };


  return(
     <View style={{flex:1 , justifyContent:'center' , alignItems:'center' }}>
   
     <GoogleSigninButton
  style={{ width: 192, height: 48 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={signIn}
  //disabled={this.state.isSigninInProgress}
/>

<View style={{width:"100%" , paddingHorizontal:20 , alignSelf:'center' , marginTop:25 , backgroundColor:'#fff' }}>
<Text style={{color:"black" , marginVertical:20}}>Email: {email}</Text>
<Text style={{color:"black" , marginVertical:20}}>AccessToken: {token}</Text>

</View>
     </View>
  ); 

}



export default App;
