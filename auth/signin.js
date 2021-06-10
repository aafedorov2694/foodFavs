import React from 'react';
import { ThemeProvider, Button, Input} from 'react-native-elements';
import { useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';
import {login} from '../styling/theme';
import { Alert } from 'react-native';

export default function SignUp ({navigation, route}) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const createUser = () => {

        
      
        firebase.auth().signInWithEmailAndPassword(email, password)
            
            .then((userCredential) => {
                 var user = userCredential.user;
                 
                 console.log(user);
                 
            },
                navigation.navigate('Drawers', {screen:'First Page'})
            )

             .catch((error) => {
                navigation.navigate('SignIn')
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(errorMessage);
                
                
            })
           
    }

  
    

    
    
    return(

        <ThemeProvider theme = {login}>
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
                title='Sign in'
                onPress = {createUser}
            
            />
            


        </ThemeProvider>


    );
}