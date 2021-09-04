import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, ListItem, Image, Button, Tile, Card } from 'react-native-elements';
import { useEffect, useState } from 'react/cjs/react.development';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable, TouchableOpacity } from 'react-native';
import { theme } from '../styling/theme';


export default function searchRec({ route, navigation }) {

  const routeSearch = route.params.search
  const [search, setSearch] = useState('');
  const [findings, setFindings] = useState([]);
  
  useEffect(() => {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${routeSearch}&instructionsRequired=true`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        setFindings(responseJson.results)

      })

  }, [routeSearch])

  const iconPress = () => {
    search == '' ? (Alert.alert('What are you searching for?')
    ) : (fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${search}&instructionsRequired=true`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        setFindings(responseJson.results)

      }));

  }

  



  return (
    <ThemeProvider theme={theme}>

      <View style={{ flexDirection: 'row' }} >
        <Searchbar
          placeholder='Search'
          onChangeText={(text) => setSearch(text)}
          value={search}
          onIconPress={iconPress}
          style={{ margin: 10, width: 400 }}
        />
      </View>
      <FlatList
        style={{ flex: 2 }}
        data={findings}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Card>
            <Card.Title>
              The recipy has not been invented yet ;(
            </Card.Title>
          </Card>
        }
        renderItem={({ item }) =>

          <Tile
            imageSrc={{ uri: `https://spoonacular.com/recipeImages/${item.image}` }}
            title={<Text>{item.title}</Text>}
            onPress={() => navigation.navigate('recDetails', { id: item.id, title: item.title })}
          />
        }
      />



    </ThemeProvider>
  );
}


