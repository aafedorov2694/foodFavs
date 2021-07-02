import React from 'react';
import { FlatList, View } from 'react-native';
import { Image } from 'react-native';
import{ Header, Card, Button, ThemeProvider, Input } from'react-native-elements';
import Icon  from 'react-native-vector-icons';
import { useState } from 'react/cjs/react.development';
import {theme} from './styling/theme';
import * as firebase from 'firebase';
import { Pressable } from 'react-native';

export default function firstPage ({route, navigation})  {
 const foodType = [
     {title: 'Main Course', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=main&course', image: 'https://spoonacular.com/recipeImages/592479-312x231.jpg'},
     {title: 'Salad', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=salad', image: 'https://spoonacular.com/recipeImages/689502-312x231.jpg'},
     {title: 'Soup', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=soup', image: 'https://spoonacular.com/recipeImages/677670-312x231.jpg'},
     {title: 'Appetizer', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=appetizer', image: 'https://spoonacular.com/recipeImages/733459-312x231.jpg'},
     {title: 'Dessert', link: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?type=dessert', image: 'https://spoonacular.com/recipeImages/523253-312x231.jpg'},
    ];
const user = route.params;
    const [search, setSearch] = useState('');
    
    const toggleMenu = () => {
       return( <Button
        onPress = {() => navigation.toggleDrawer()}
        icon={{
          name: "menu",
          color: '#fff'
        }}/>
       )
    }

    return(
        <ThemeProvider theme = {theme} >
                      
            <Input
                placeholder = 'Search recipy'
                onChangeText = {(text) => setSearch(text)}
            />  
            <Button
            title = 'Search'
            onPress = {() => navigation.navigate('Stacks', {screen: 'Search', params: {search: search}})}
           />

           
            <FlatList
                style = {{flex: 2}}
                data = {foodType}
                keyExtractor = {(item, index) => index.toString()}
                renderItem ={({item}) => 
                <Pressable
                    onPress = {
                        () => navigation.navigate('Stacks', {screen:'Random Recipe', params:{searchItem: item.link}})
                    }
                >
                    <Card>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Divider/>
                    <Card.Image
                        source = {{uri:item.image }}
                    />
                    <Button
                        title = 'Look up'
                        onPress = {() => navigation.navigate('Random Recipe', {searchItem: item.link})}
                    />
                    </Card>
                </Pressable>
                }
            
            />
            
           

        </ThemeProvider>
    );
}