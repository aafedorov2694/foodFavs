import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import * as firebase from 'firebase';
import { useNavigationState} from '@react-navigation/native';


export default function Splash({ navigation, route }) {

  const index = useNavigationState(state => state);

    useEffect(
        () => {
         firebase.auth().onAuthStateChanged((user) => {
           if (user) {
            navigation.navigate('Menu');
           } else {
            navigation.navigate('Welcome');

           }
         });
       }
     );


  return (
    <View style={[styles.container, styles.horizontal]} >
        <ActivityIndicator size="large"/>
        <Text>
          SPLASH
          SPLASH
          SPLASH
        </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      justifyContent: "center",
      padding: 10
    }
  });