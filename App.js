import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, CustomDrawerContent, DrawerView} from '@react-navigation/drawer';
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
import { useEffect, useState } from 'react/cjs/react.development';
import { Pressable } from 'react-native';
import { Divider } from 'react-native-elements';


if (!firebase.apps.length) {
  console.log('Connected with Firebase')
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function Stacks() {

  return(
    <Stack.Navigator>
      <Stack.Screen  name="recDetails" component={recDetails}/> 
      <Stack.Screen  name="Random Recipe" component={randomRec}/>
      <Stack.Screen name = 'Search' component={searchRec}/>
    </Stack.Navigator>
  )
}

function Drawers() {

  return (
    <Drawer.Navigator>
      <Drawer.Screen name = 'Welcome' component={welcome}/>
      <Drawer.Screen name = 'SignIn' component={signin}/>
      <Drawer.Screen  name="SignUp" component={signup}/> 

    </Drawer.Navigator>
  
  );
}

export default function App() {
  
  const[isSigned, setIsSigned] = useState(null)
 useEffect(() => {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      setIsSigned(true)
    } else { 
      setIsSigned(false)
    }
    console.log('isSigned: ' + isSigned)
  })

 }, [])

  function CustomDrawerContent(props){
    
    return(
        <DrawerContentScrollView {... props}>
           {isSigned === true ? (
             <>
              <DrawerItem
                label = {firebase.auth().currentUser.displayName}
                labelStyle = {{paddingBottom: 30, textDecorationLine: 'underline', textAlign: 'center'}}

              
              />
              <Divider/>
              <DrawerItem 
                label = 'Explore'
                onPress = {() => props.navigation.navigate('Explore')} />
              <DrawerItem 
                label = 'Favourites'
                onPress = {() => props.navigation.navigate('Favourite recipes')} />
              <DrawerItem 
                label = 'Profile'
                onPress = {() => props.navigation.navigate('Profile')} />
              

              <DrawerItem
                labelStyle = {{marginTop: 470, textDecorationLine: 'underline'}}
                label = 'Sign out'
                onPress = {() => firebase.auth().signOut().then(() => {

                }).catch((error) => {
                    console.log(error)
                  })} /> 
              </> ) : (
                Drawers()
              )
              }
        </DrawerContentScrollView>
     
    )
  }
  

  return (

    <NavigationContainer>
     <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props}
      style={{backgroundColor: '#36846b'}} />}>
       {isSigned === true ? (
          <>   
          <Drawer.Screen name="Explore" component={firstPage} />
          <Drawer.Screen name="Favourite recipes" component={savedRec} />
          <Drawer.Screen name="Profile" component={profile} />

          <Drawer.Screen  
            name="Stacks" 
            component={Stacks}
            options={{
              drawerLabel: () => null,
            }}
              />
          </>
          ) : (
            <>
              <Drawer.Screen name = 'Welcome' component={welcome}/>
              <Drawer.Screen name = 'SignIn' component={signin}/>
              <Drawer.Screen  name="SignUp" component={signup}/> 
            </>
            )
         }
      </Drawer.Navigator>
    </NavigationContainer>

  );

  
}

