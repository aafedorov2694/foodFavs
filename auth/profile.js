import React from 'react';
import { ThemeProvider, Button, Input, Text} from 'react-native-elements';
import { useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';
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

export default function Profile({navigation, route}) {
    
    const name = firebase.auth().currentUser.displayName;

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            console.log(error)
          });
    }

    const getUserId = () =>  {
        console.log('userId: ' + firebase.auth().currentUser.uid);
    }

    
    
    return(

        <ThemeProvider theme = {login}>
           
        <Text>{name}</Text>
            <Button
                title='Sign out'
                onPress = {signOut}
            />

            <Button
                title='Get User Id'
                onPress = {getUserId}
            />




        </ThemeProvider>


    );
}