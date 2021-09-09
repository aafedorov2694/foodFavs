import React from 'react';
import { ThemeProvider, Button, Text, Card} from 'react-native-elements';
import * as firebase from 'firebase';
import {login} from '../styling/theme';



export default function Profile({navigation, route}) {
    
    const name = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;

    const signOut = () => {
        firebase.auth().signOut().then(() => {

        }).catch((error) => {
            console.log(error)
          });
    }

    
    return(

        <ThemeProvider theme = {login}>

            <Card>
                <Card.Title>Profile Settings</Card.Title>
                <Card.Divider/>
                <Text h4>Name: {name}</Text>
                <Text h4>Email: {email}</Text>
                <Card.Divider/>
                
                <Button
                title='Sign out'
                onPress = {signOut}
            />
            </Card>
        </ThemeProvider>


    );
}