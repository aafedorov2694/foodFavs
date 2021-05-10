import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';




export default function savedRec({navigation}) {

  const[recipy, setRecipy] = React.useState({});
  
  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      
      const prods = Object.values(data);
      setRecipy(prods);
    })
  }, []);

  const Delete =()=>{
    
    var key = firebase.database().ref('items/').push().key.id;


     firebase.database().ref('items/' + recipy.id).remove();
    }
  
  
  

  
  return (
    
    <View style={styles.container}> 
       
      <FlatList
      data = {recipy}
      keyExtractor = {(item, index) => index.toString()}
      renderItem ={({item}) => 
        <View> 
          <Text style ={{fontSize: 20, marginTop: 100}}>{item.title} {item.id}</Text>  
          <Button title = 'View Details' onPress = {() => navigation.navigate('navi' , {screen: 'recDetails', params: {id: item.id, title: item.title}})}/>
          <Button title = 'Delete' onPress = {Delete}/>

        </View>
        }
      />
      
    
    </View>
  )
      }
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
