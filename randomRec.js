import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import{ Header } from'react-native-elements';


export default function randomRec({route, navigation}) {
    
  const [recipes, setRecepies]  = useState([]);
  const [link, setLink] = useState([]);
  const [pictures, setPictures] = useState([]);
  //const{user} = route.params;

    
     
  useEffect (() =>{
   fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=pie&number=10&offset=0", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }})
      .then(response => response.json())
      .then(responseJson => {
        setRecepies(responseJson.results);
        setLink(responseJson);
       })
       
       
        .catch(err => console.log('Error: ' + err))
    }, [])

    
   return (
    <View style={styles.container}>

      
      <Text style={{fontSize:20, margin: 30, backgroundColor: 'green', padding: 10}}>REcipy</Text>
     
      <FlatList

        style = {{flex: 2}}
        data = {recipes}
        keyExtractor = {(item, index) => index.toString()}
        renderItem ={({item}) => 
        
        <View> 
          <Text style ={{fontSize: 20}}>{item.title} {item.id}</Text>  
          <Image style = {{width: 100, height:95}} source = {{uri: `https://spoonacular.com/recipeImages/${item.image}`}}/>
          <Button title = 'View Details' onPress = {() => navigation.navigate('recDetails', {screen: 'recDetails', params: {id: item.id, title: item.title}})}/>
        </View>
        
        }
      />
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
