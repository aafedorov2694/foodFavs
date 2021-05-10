import { useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import randomRec from './randomRec';
import savedRec from './savedRec';
import searchRec from './searchRec';


var firebaseConfig = {
  apiKey: "AIzaSyBVwG1pX_vDuJFxatenqzSQiVhwKL6MP3U",
  authDomain: "foodfavs-b35b7.firebaseapp.com",
  databaseURL: "https://foodfavs-b35b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foodfavs-b35b7",
  storageBucket: "foodfavs-b35b7.appspot.com",
  messagingSenderId: "248221142948",
  appId: "1:248221142948:web:c679388398b1ce145efb31"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()



export default function recDetails({route, navigation}) {

  var inDB = true;
    const {id} = route.params;
    const [ing, setIng] = useState([]);
    const [instruction, setInstruction] = useState([]);
    const {title} = route.params;
    
     
    useEffect (() =>{
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }})
        .then(response => response.json())
        .then(responseJson => {
            setIng(responseJson.ingredients);
            console.log(responseJson.ingredients)
             })
       
       
        .catch(err => console.log('Error: ' + err))
    }, [])

    

    useEffect(() => {
      fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/analyzedInstructions?stepBreakdown=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }})
        .then(response => response.json())
        .then(responseJson => {
          
            setInstruction(responseJson[0].steps);
          
            console.log(responseJson[0].steps)
             })
       
       
        .catch(err => console.log('Error: ' + err))
    }, [])

    const Like = () => {
      

      firebase.database().ref('items/').on('value', snapshot => {
          const data = snapshot.val();
          if(data == null){
            firebase.database().ref('items/').push(
              {'id': id, 'ingridients': ing, 'instruction': instruction, 'title': title},
              (error) => {
                error? Alert.alert('Something went wrong') : Alert.alert('Recipy saved')
              
              });
          } else { 
              const prods = Object.values(data);
              
              
              prods.forEach((e) => {
                e.id == id ? inDB = true : inDB = false;
                console.log(inDB)
              })
                
      }
    });

      if(inDB === false){
        firebase.database().ref('items/').push(
          {'id': id, 'ingridients': ing, 'instruction': instruction, 'title': title},
          (error) => {
            error? Alert.alert('Something went wrong') : Alert.alert('Recipy saved')
    }
      )} else {
        Alert.alert('Recipy is already saved');
        inDB = true;
    };
      }
  
   
    
  
  
  
    return (
    <View style={styles.container}>
      <Text style={{fontSize:20, margin: 10, backgroundColor: 'green', padding: 5}}>{title}</Text>
    
      <FlatList

        style = {{flex: 2}}
        data = {ing}
        keyExtractor = {(item, index) => index.toString()}
        renderItem ={({item}) => 
      
        <View> 
          <Text style ={{fontSize: 15}}>{item.name}, {item.amount.metric.value} {item.amount.metric.unit} </Text>  
        </View>
      
      }
    />
    <StatusBar style="auto" />

      
    <FlatList

        style = {{flex: 2}}
        data = {instruction}
        keyExtractor = {(item, index) => index.toString()}
        renderItem ={({item}) => 

      <View> 
        <Text style ={{fontSize: 15}}>{item.number}. {item.step} </Text>  
      </View>
  }
    />
    <Button title = 'Back' onPress = {() => navigation.reset({id:'', routes:[{name: 'Home'}]})}/>
    <Button title = 'Like' onPress = {Like} />

    <StatusBar style="auto" />
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
});

