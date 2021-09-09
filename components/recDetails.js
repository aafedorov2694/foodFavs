import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { ThemeProvider, Card, Button, Text } from 'react-native-elements';
import { theme } from '../styling/theme';



export default function recDetails({ route, navigation }) {

  const { id, title } = route.params
  const [ing, setIng] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [image, setImage] = useState('');
  const userId = firebase.auth().currentUser.uid;

  useEffect(() => {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/ingredientWidget.json`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "abc1e00486mshd1d3a953975f5c1p10f38cjsn3d0b1c2135c1",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
    })
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
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        setInstruction(responseJson.instructions);
        setImage(responseJson.image);
        console.log('Image: ' + responseJson.image);
      })
      .catch(err => console.log('Error: ' + err))
  }, [id])

  const Like = () => {


    var ref = firebase.database().ref(`items/${userId}`).orderByKey();
    console.log('Ref: ' + ref)

    ref.once("value")
      .then(function (snapshot) {
        if (snapshot.exists() === false) {
          firebase.database().ref(`items/${userId}`).push({ 'id': id, 'title': title, 'image': image });
          Alert.alert('Recipe is added to favourites')
        }

        if (snapshot.exists() === true) {
          var exist = snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val().id;
            console.log('Children: ' + ref)
            if (childData === id) {
              Alert.alert('Recipe is already saved')
              return true
            }
          });

        }

        if (exist === false) {
          firebase.database().ref(`items/${userId}`).push({ 'id': id, 'title': title, 'image': image });
          Alert.alert('Recipe is added to favourites')
        }
      });


  }





  return (
    <ThemeProvider theme={theme}>
      <ScrollView>

        <Card>
          <Card.Title h4>Ingridients</Card.Title>
          <Card.Divider />
          {
            ing.map((ing, i) => {
              return (
                <Text key={i}>
                  {ing.name}, {ing.amount.metric.value} {ing.amount.metric.unit}
                </Text>

              )
            })
          }

          <Card.Title h4>Instructions</Card.Title>
          <Card.Divider />
          <Text>{instruction}</Text>


          <Button title='Like' onPress={Like} />
        </Card>


      </ScrollView>
    </ThemeProvider>
  );

}
