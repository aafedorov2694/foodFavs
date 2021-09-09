
import React from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../configs/firebaseConf';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';



if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(firebaseConfig);
  }
  
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Stacks() {

    return(
      <Stack.Navigator>
        <Stack.Screen  
          name="recDetails" 
          component={recDetails}
         
          /> 
        <Stack.Screen  name="Random Recipe" component={randomRec}/>
        <Stack.Screen name = 'Search' component={searchRec} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }
  
function Menu(){
    
    return(
      <Drawer.Navigator>
        <Drawer.Screen name='Splash' component={Splash}/>
        <Drawer.Screen 
          name="Explore" 
          component={firstPage}
          options={{headerShown: true}}
          />
        <Drawer.Screen name="Favourite recipes" component={savedRec} options={{headerShown: true}} />
        <Drawer.Screen name="Profile" component={profile} options={{headerShown: true}}/>
        <Drawer.Screen  
                name="Stacks" 
                component={Stacks}
                options={{headerShown: false}}
                
                  />
      </Drawer.Navigator>
    )
  
  }

  
  function IntitalNavigator(){
    
    function CustomDrawerContent(props){
    
        return(
            <DrawerContentScrollView {... props}>
            <View style={{backgroundColor: 'blue', paddingTop: 10}}>
             
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
           
    <NavigationContainer>
     
    <Drawer.Navigator 
    drawerContent={props => <CustomDrawerContent {...props}
    style={{backgroundColor: '#36824r'}} />}>
      <Drawer.Screen name="Menu" component={Menu}/>
      <Drawer.Screen  
          name="Stacks" 
          component={Stacks}
          options={{headerShown: false}}
      />
    </Drawer.Navigator>

 

</NavigationContainer>

  }
  