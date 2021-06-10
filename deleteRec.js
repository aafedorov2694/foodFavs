import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';


export default function deleteRec ({route, navigation}) {
    
    const {id} = route.params

    const erase = () => {
    var query = firebase.database().ref("items/").orderByKey();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var id = childSnapshot.child('id').val();
          console.log(id)

    firebase.database().ref('items/' + id).remove()})})
    ;
    }

    return(
        <View>
            <Button title = "Delete" onPress = {erase}/>
        </View>
    );
}