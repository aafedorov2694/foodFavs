import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import randomRec from './components/randomRec';
import savedRec from './components/savedRec';
import recDetails from './components/recDetails'
import firstPage from './components/firstPage';
import * as firebase from 'firebase';
import searchRec from './components/searchRec';
import signup from './auth/signup';
import signin from './auth/signin';
import welcome from './auth/welcome';
import profile from './auth/profile';
import Splash from './auth/splash';
import savedRecDetails from './components/savedRecDetails';
import { firebaseConfig } from './configs/firebaseConfig';
import { TabBar } from './styling/tabStyle'
import { Icon } from 'react-native-elements/dist/icons/Icon'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Typeof: ' + typeof firebase.apps)
  } else {
    firebase.app();
  }

  const [isSigned, setIsSigned] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsSigned(true)
      } else {
        setIsSigned(false)
      }
    })
  }, [])



  return (
    <NavigationContainer>

      {isSigned == true ? (
        <Tab.Navigator>
          <Tab.Screen
            name='Explore'
            component={Explore}
            options={{
              tabBarLabel: 'Explore',
              tabBarIcon: ({ color, size }) => (
                <Icon name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Favs'
            component={Favs}
            options={{
              tabBarLabel: 'Favourites',
              tabBarIcon: ({ color, size }) => (
                <Icon name="favorite" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name='Profile'
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Icon name="person" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>


      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name='AuthScreens'
            component={AuthScreens}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
  );


}

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={profile}
      />
    </Stack.Navigator>
  );
}

function AuthScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Splash'
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Welcome'
        component={welcome}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name='SignIn'
        component={signin}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name='SignUp'
        component={signup}
        options={{ headerShown: false }}

      />
    </Stack.Navigator>
  )
}

function Explore() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Explore'
        component={firstPage}
      />
      <Stack.Screen
        name='recDetails'
        component={recDetails}
        options={({ route }) => ({
          title: route.params.title,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="Random Recipe"
        component={randomRec}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name='Search'
        component={searchRec}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <HeaderBackButton onPress={
              () => { navigation.setParams(route.params.search = ' '); navigation.navigate('Explore') }} />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

function Favs() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Favourites'
        component={savedRec}
      />
      <Stack.Screen
        name='SavedDetails'
        component={savedRecDetails}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
    </Stack.Navigator>
  )
}



