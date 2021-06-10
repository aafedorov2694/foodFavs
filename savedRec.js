import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import{ Header, Card, ThemeProvider, ListItem } from'react-native-elements';
import { useEffect, useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';
import { Image } from 'react-native';
import { StackActions } from '@react-navigation/routers';




export default function savedRec({navigation}) {

  const[recipy, setRecipy] = React.useState([]);
  const userId = firebase.auth().currentUser.uid;

  
  
  useEffect(() => {
    firebase.database().ref(`items/${userId}`).on('value', snapshot => {
      const data = snapshot.val();
      if(data === null){
        setRecipy([{id: null, title: 'No recipies saved'}])
      }
      if(data !== null){
      const prods = Object.values(data);
      setRecipy(prods);
      console.log(JSON.stringify(data));
      console.log('RECIPY: ' + recipy);
      }
    })
  }, []);
  

 
  
  

  
  return (
    
    <ThemeProvider> 

      
       
      <FlatList
      data = {recipy}
      keyExtractor = {(item, index) => index.toString()}
      renderItem ={({item}) => 
        <ListItem bottomDivider>
         <Image style = {{width: 100, height:95}} source = {{uri:item.image}}/>
         <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
         </ListItem.Content>
         <Button title = 'Details' onPress = {() => navigation.navigate('recDetails', {id: item.id, title: item.title})}/>
         </ListItem>
        
        }
      />
      
    
    </ThemeProvider>
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
