import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as firebase from 'firebase';


export default function Splash({ navigation }) {


  useEffect(
    () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
        } else {
          navigation.navigate('AuthScreens', { screen: 'Welcome' })
        }
      });

    },
    []);


  return (
    <View style={styles.horizontal} >
      <ActivityIndicator size={100} color="#36846b" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 300
  }
});