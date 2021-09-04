import React , { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../styling/theme';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { ThemeProvider, Card, Button, Text } from 'react-native-elements';
import { Alert } from 'react-native';


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




export default function savedRecDetails ({route, navigation}) {
    
    const {id, title} = route.params
    const [ing, setIng] = useState([]);
    const [instruction, setInstruction] = useState([]);
    const[image, setImage] = useState('');
    const userId = firebase.auth().currentUser.uid;
     

    
    
    useEffect (() => {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }})
        .then(response => response.json())
        .then(responseJson => {
            setIng(responseJson.ingredients);

             })
       
       
        .catch(err => console.log('Error: ' + err))
    }, [id])

    

    useEffect(() => {
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }})
        .then(response => response.json())
        .then(responseJson => {
            setInstruction(responseJson.instructions);
            setImage(responseJson.image);
            console.log('Image: ' + responseJson.image);
             })
        .catch(err => console.log('Error: ' + err))
    },[id])

    const erase = () => {
      
      const item = firebase.database().ref(`items/${userId}`).orderByKey();
 
      item.once('value')
       .then(
         function(snapshot){
           if (snapshot.exists()) {
             snapshot.forEach(function(childSnapshot) {
                              
               if(childSnapshot.val().id === id){
                 console.log('Snapshot: ' + childSnapshot.key)
                 firebase.database().ref(`items/${userId}/${childSnapshot.key}`).remove();
               }
             })
           }
         }
       )
       .then(() => navigation.navigate('Menu', {screen: 'Favourite recipes'}))
       .then(() => Alert.alert('Recipy removed'))
       .catch((err) => console.log('Error: ' + err))
            
     }

         
  
  
    return (
    <ThemeProvider theme = {theme}>
      <ScrollView>
       <Card>
        <Card.Title h4>Ingridients</Card.Title>
        <Card.Divider/>
        {
          ing.map((ing, i) => {
            return(
              <Text key = {i}>
                {ing.name}, {ing.amount.metric.value} {ing.amount.metric.unit}
              </Text>
              
            )
          }
        )
        }
          
          <Card.Title h4 style={{paddingTop: 20}}>Instructions</Card.Title>
          <Card.Divider/>
           <Text>{instruction}</Text>
        
          <Button title = 'Delete' onPress = {erase}/>
      </Card>

   
    </ScrollView> 
    </ThemeProvider>
  );
}