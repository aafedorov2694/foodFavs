import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, ListItem, Image, Button } from 'react-native-elements';
import { useEffect, useState } from 'react/cjs/react.development';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';


export default function searchRec({route, navigation}) {
 
 const {search} = route.params;
 const [findings, setFindings] = useState([]);
 
 useEffect(() => {
   fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${search}`, {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
  }})
    .then(response => response.json())
    .then(responseJson => {
      setFindings(responseJson.results)
      console.log('RegExp: ' + JSON.stringify(search))
      console.log(findings)
    })

 },[])



  return (
    <ThemeProvider>
      <FlatList
        style = {{flex: 2}}
        data = {findings}
        keyExtractor = {(item, index) => index.toString()}
        renderItem ={({item}) => 
        <Pressable onPress = {() => navigation.navigate('recDetails', {id: item.id, title: item.title})}>
          <ListItem bottomDivider>
          <Image style = {{width: 100, height:95}} source = {{uri:`https://spoonacular.com/recipeImages/${item.image}`}}/>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Pressable>
                    
        }
      />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
