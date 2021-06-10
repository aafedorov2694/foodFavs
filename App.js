import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import randomRec from './randomRec';
import savedRec from './savedRec';
import recDetails from './recDetails'
import firstPage from './firstPage';
import * as firebase from 'firebase';
import firebaseConfig from './configs/firebaseConf';
import searchRec from './searchRec';
import signup from './auth/signup';
import signin from './auth/signin';
import welcome from './auth/welcome';
import profile from './auth/profile';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(firebaseConfig);
}


function Drawers() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="First Page" component={firstPage} />
      <Drawer.Screen name="Favourite recipes" component={savedRec} />
      <Drawer.Screen name="Profile" component={profile} />

    </Drawer.Navigator>
  
  );
}

export default function App() {

  
  return (

    <NavigationContainer>
     <Stack.Navigator initialRouteName = 'Welcome'>
     <Stack.Screen name = 'Welcome' component={welcome}/>
     <Stack.Screen  
        name="Drawers" 
        component={Drawers}
        />
      <Stack.Screen  name="recDetails" component={recDetails}/> 
      <Stack.Screen  name="Random Recipe" component={randomRec}/>
      <Stack.Screen name = 'Search' component={searchRec}/>
      <Stack.Screen name = 'SignIn' component={signin}/>
      <Stack.Screen  name="SignUp" component={signup}/> 




      </Stack.Navigator>
    </NavigationContainer>

  );

  
}

