import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import randomRec from './components/randomRec';
import savedRec from './components/savedRec';
import recDetails from './components/recDetails'
import firstPage from './components/firstPage';
import * as firebase from 'firebase';
import firebaseConfig from './configs/firebaseConf';
import searchRec from './components/searchRec';
import signup from './auth/signup';
import signin from './auth/signin';
import welcome from './auth/welcome';
import profile from './auth/profile';
import Splash from './auth/splash';
import savedRecDetails from './components/savedRecDetails';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



export default function App() {

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
        <Drawer.Navigator
          drawerContent={(props, route) => <CustomDrawerContent {...props} {...route}
            style={{ backgroundColor: '#36824r' }}
          />}
        >
          <Drawer.Screen
            name='Drawers'
            component={Drawers}
          />
        </Drawer.Navigator>
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

function Stacks() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="recDetails"
        component={recDetails}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="Random Recipe"
        component={randomRec}
        options={({ navigation, route }) => ({
          title: route.params.title,
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Menu' }]
            })} />
          ),
        })}
      />
      <Stack.Screen
        name='Search'
        component={searchRec}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <HeaderBackButton onPress={
              () => { navigation.setParams(route.params.search = ' '); navigation.navigate('Menu', { screen: 'Explore' })}} />
          ),
        })}
      />
      <Stack.Screen
        name='SavedDetails'
        component={savedRecDetails}
        options={({ navigation, route }) => ({
          title: route.params.title,
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.navigate('Menu', { screen: 'Favourite recipes' })} />
          ),
        })} />

    </Stack.Navigator>
  )
}

function Menu() {


  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Explore"
        component={firstPage}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Favourite recipes"
        component={savedRec}
        options={{ headerShown: true }} />
      <Drawer.Screen
        name="Profile"
        component={profile}
        options={{ headerShown: true }} />
      <Drawer.Screen
        name="Stacks"
        component={Stacks}
        options={{ headerShown: false }}
      />

    </Drawer.Navigator>
  )
}

const CustomDrawerContent = (props) => {

  return (

    <DrawerContentScrollView {...props} >

      <DrawerItem
        label='Explore'
        onPress={() => props.navigation.navigate('Menu', { screen: 'Explore' })}
      />
      <DrawerItem
        label='Favourites'
        onPress={() => props.navigation.navigate('Menu', { screen: 'Favourite recipes' })}
      />
      <DrawerItem
        label='Profile'
        onPress={() => props.navigation.navigate('Menu', { screen: 'Profile' })}
      />

      <View style={{ marginTop: 450 }}>
        <DrawerItem
          labelStyle={{ textAlignVertical: 'bottom', textDecorationLine: 'underline' }}
          label='Sign out'
          onPress={() => firebase.auth().signOut()
            .then()
            .catch((error) => {
              console.log(error)
            })} />
      </View>
    </DrawerContentScrollView>

  )
}

function Drawers() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen
        name="Menu"
        component={Menu}
      />
      <Drawer.Screen
        name="Stacks"
        component={Stacks}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}



