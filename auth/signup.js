import React, { useEffect, useState } from 'react';
import { ThemeProvider, Button, Input } from 'react-native-elements';
import * as firebase from 'firebase';
import "firebase/firestore";
import { login } from '../styling/theme';
import { Alert, View } from 'react-native';


export default function SignUp({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Firebase app: ' + firebase.apps)
  })



  const createUser = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({
          displayName: name
        })
      })


      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage)
        // ..
      });
  }


  return (

    <ThemeProvider theme={login}>
      <View style = {{paddingTop: 200}}>
        <Input
          placeholder='Name'
          onChangeText={(value => setName(value))}
        />


        <Input
          style = {{paddingTop: 50}}
          placeholder='Email'
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          placeholder='Password'
          onChangeText={(value => setPassword(value))}
          secureTextEntry={true}
        />


        <Button
          title='Sign up'
          onPress={createUser}

        />
      </View>



    </ThemeProvider>


  );
}