import React, { useCallback, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Button, ThemeProvider, Tile, Input } from 'react-native-elements';
import { useState } from 'react/cjs/react.development';
import { theme } from '../styling/theme';
import { Searchbar } from 'react-native-paper';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function firstPage({ route, navigation }) {
  const foodType = [
    { title: 'Main Course', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=main&course', image: 'https://spoonacular.com/recipeImages/592479-312x231.jpg' },
    { title: 'Salad', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=salad', image: 'https://spoonacular.com/recipeImages/689502-312x231.jpg' },
    { title: 'Soup', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=soup', image: 'https://spoonacular.com/recipeImages/677670-312x231.jpg' },
    { title: 'Appetizer', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=appetizer', image: 'https://spoonacular.com/recipeImages/733459-312x231.jpg' },
    { title: 'Dessert', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=dessert', image: 'https://spoonacular.com/recipeImages/523253-312x231.jpg' },
  ];
  const [search, setSearch] = useState('');

  const iconPress = () => {
    search !== '' ? navigation.navigate('Stacks', { screen: 'Search', params: { search: search } }) : (Alert.alert('What are you searching for?'));
    setSearch('')
  }


  return (
    <ThemeProvider theme={theme} >

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
        data={foodType}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Tile
              imageSrc={{ uri: item.image }}
              title={<Text>{item.title}</Text>}
              onPress={() => navigation.navigate('Stacks', { screen: 'Random Recipe', params: { searchItem: item.link, title: item.title } })}
            />
          </View>
        }
      />
    </ThemeProvider>
  );
}