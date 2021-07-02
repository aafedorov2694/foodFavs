import React from 'react';
import { StyleSheet, View } from 'react-native';
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
import { Divider, Header} from 'react-native-elements';


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

function Menu(){
  
  return(
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={firstPage}/>
      <Stack.Screen name="Favourite recipes" component={savedRec} />
      <Stack.Screen name="Profile" component={profile} />
      <Stack.Screen  
              name="Stacks" 
              component={Stacks}
              
                />
    </Stack.Navigator>
  )

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
        <View style={{backgroundColor: 'blue', paddingTop: 10}}>
         <DrawerItem
          label = {firebase.auth().currentUser.displayName}
          labelStyle = {{paddingBottom: 30, textDecorationLine: 'underline', textAlign: 'center'}}
         />
         </View>


          <DrawerItem 
            label = 'Explore'
            onPress = {() => props.navigation.navigate('Menu', {screen: 'Explore'})}
            
            />
           
          <DrawerItem 
            label = 'Favourites'
            onPress = {() => props.navigation.navigate('Menu', {screen: 'Favourite recipes'})} />
          <DrawerItem 
            label = 'Profile'
            onPress = {() => props.navigation.navigate('Menu', {screen: 'Profile'})} />
              
          <View style = {{marginTop: 450}}>
            <DrawerItem
              labelStyle = {{textAlignVertical: 'bottom', textDecorationLine: 'underline'}}
              label = 'Sign out'
              onPress = {() => firebase.auth().signOut().then(() => {

                  }).catch((error) => {
                      console.log(error)
                    })} />
          </View>
             
        </DrawerContentScrollView>
     
    )
  }
  

  return (
    
    

    <NavigationContainer>
      {isSigned === true ? (
        <Drawer.Navigator 
        drawerContent={props => <CustomDrawerContent {...props}
        style={{backgroundColor: '#36824r'}} />}>
          <Drawer.Screen name="Menu" component={Menu}/>
          <Drawer.Screen  
              name="Stacks" 
              component={Stacks}
              
                />

          
        </Drawer.Navigator>

      ):(
        <Stack.Navigator>
          <Stack.Screen name = 'Welcome' component={welcome}/>
          <Stack.Screen name = 'SignIn' component={signin}/>
          <Stack.Screen  name="SignUp" component={signup}/> 
        </Stack.Navigator>
      )}


    </NavigationContainer>

  );

  
}

