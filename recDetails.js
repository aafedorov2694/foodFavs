import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, CommonActions } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { ThemeProvider, Card, Button } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { theme } from './styling/theme';


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



export default function recDetails({route, navigation}) {

    const {id, title} = route.params
    const [ing, setIng] = useState([]);
    const [instruction, setInstruction] = useState('');
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

    const Like = () => {
     
     
      var ref = firebase.database().ref(`items/${userId}`).orderByKey();
      
      ref.once("value")
        .then(function(snapshot) {
          if(snapshot.exists() === false){
            firebase.database().ref(`items/${userId}`).push({'id': id, 'title': title, 'image': image}); 
          } 
          
          if(snapshot.exists() === true){
             var exist = snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val().id;
                console.log('childData: ' + childData + ' ' + 'id: ' + id)
                if(childData === id){
                  Alert.alert('Recipe is already saved')
                  return true
                } 
              });
         
        }

          if(exist === false) {
            firebase.database().ref(`items/${userId}`).push({'id': id, 'title': title, 'image': image});
            Alert.alert('Recipe is added to favourites')
          }
      });
      
      
} 
  

      
  
  
    return (
    <ThemeProvider theme = {theme}>
      <Text style={{fontSize:20, margin: 10, backgroundColor: 'green', padding: 20}}>{title}</Text>
    
      <FlatList
        style ={{fontSize: 18, alignContent: 'center', paddingBottom: 50}}
        data = {ing}
        keyExtractor = {(item, index) => index.toString()}
        renderItem ={({item}) => 
        <View> 
          <Text style ={{fontSize: 18, alignContent: 'center'}}>{item.name}, {item.amount.metric.value} {item.amount.metric.unit} </Text>  
        </View>
        
    
      }
      
    />

    <Divider/>
    <ScrollView>
      <Card>
        <Card.Title>Instructions</Card.Title>
        <Card.Divider/>
      
          <Text style = {{fontSize:18,padding: 20}}>{instruction}</Text>
  
        <Button title = 'Back' onPress = {() => {
          navigation.setParams({
            id: ' ',
            ing: [],
            instruction: [],
            title: ''
          });
        navigation.goBack()}}/>
      <Button title = 'Like' onPress = {Like} />

      </Card>
    </ScrollView> 
    </ThemeProvider>
  );

}
