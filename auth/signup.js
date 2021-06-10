import React from 'react';
import { ThemeProvider, Button, Input} from 'react-native-elements';
import { useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';
import "firebase/firestore";
import {login} from '../styling/theme';


var firebaseConfig = {
    apiKey: "AIzaSyBVwG1pX_vDuJFxatenqzSQiVhwKL6MP3U",
    authDomain: "foodfavs-b35b7.firebaseapp.com",
    databaseURL: "https://foodfavs-b35b7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "foodfavs-b35b7",
    storageBucket: "foodfavs-b35b7.appspot.com",
    messagingSenderId: "248221142948",
    appId: "1:248221142948:web:c679388398b1ce145efb31"
  };
  
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(firebaseConfig);
  }

export default function SignUp ({navigation, route}) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');

    

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
                console.log(errorMessage)
                // ..
            });
            

}

    
    
    return(

        <ThemeProvider theme = {login}>
            <Input 
                placeholder = 'Name'
                onChangeText = {(value => setName(value))}
            />


            <Input style = {{paddingTop: 250}}
                placeholder = 'Email'
                onChangeText = {(value) => setEmail(value)}
            />
             <Input 
                placeholder = 'Password'
                onChangeText = {(value => setPassword(value))}
                secureTextEntry = {true}
            />
            
            



            <Button
                title='Sign up'
                onPress = {createUser}
            
            />



        </ThemeProvider>


    );
}