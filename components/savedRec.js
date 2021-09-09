import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { Card, ThemeProvider, ListItem } from 'react-native-elements';
import { useEffect, useState } from 'react/cjs/react.development';
import * as firebase from 'firebase';
import { Image } from 'react-native';
import { login } from '../styling/theme'


export default function savedRec({ navigation }) {

  const [recipy, setRecipy] = useState([]);
  const userId = firebase.auth().currentUser.uid;


  useEffect(() => {

    firebase.database().ref(`items/${userId}`).on('value', snapshot => {
      const data = snapshot.val();

      if (data !== null) {
        const prods = Object.values(data);
        setRecipy(prods);
      } else {
        setRecipy('')
      }
    })
  }, []);


  return (

    <ThemeProvider theme={login}>

      <FlatList
        data={recipy}
        keyExtractor={(item, index) => index.toString()} 
        ListEmptyComponent={
          <Card>
            <Card.Title>
              Please add your favourite recipes :)
            </Card.Title>
          </Card>
        }
        renderItem={({ item }) =>

          <Pressable onPress={() => navigation.navigate('SavedDetails', { id: item.id, title: item.title })}>
            <ListItem bottomDivider>
              <Image style={{ width: 100, height: 95 }} source={{ uri: item.image }} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </Pressable>

        }
      />


    </ThemeProvider>
  )
}


