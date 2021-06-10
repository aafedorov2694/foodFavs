import React from 'react';
import { ThemeProvider, Button, Input} from 'react-native-elements';
import { useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';
import {login} from '../styling/theme';

export default function SignUp ({navigation, route}) {
  
    
    
    return(

        <ThemeProvider theme = {login}>
            <Button
                title='Sign in'
                onPress = {() => navigation.navigate('SignIn')}
            />

            <Button
                title='Sign up'
                onPress = {() => navigation.navigate('SignUp')}
            />
        </ThemeProvider>


    );
}