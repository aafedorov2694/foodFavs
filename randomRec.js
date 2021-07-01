import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import{ Header, Card, ThemeProvider, ListItem } from'react-native-elements';




export default function randomRec({route, navigation}) {

  const {searchItem} = route.params;
  const [recipes, setRecepies]  = useState([]);
  

  useEffect (() =>{
   fetch(`${searchItem}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }})
      .then(response => response.json())
      .then(responseJson => {
        setRecepies(responseJson.results);
        console.log('Show params: ' + JSON.stringify(responseJson.results))
       })
        .catch(err => console.log('Error: ' + err))
    }, [])

    
   return (
    
      <ThemeProvider>
        <FlatList
          data = {recipes}
          keyExtractor = {(item, index) => index.toString()}
          renderItem ={({item}) => 
          <Pressable onPress = {() => navigation.navigate('recDetails', {id: item.id, title: item.title})}>
            <ListItem bottomDivider>
              <Image style = {{width: 100, height:95}} source = {{uri:item.image}}/>
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            </ListItem>
          </Pressable>
      
          }
        />
        <StatusBar style="auto" />
      </ThemeProvider>
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
