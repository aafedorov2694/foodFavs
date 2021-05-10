import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import randomRec from './randomRec';
import savedRec from './savedRec';
import searchRec from './searchRec';
import recDetails from './recDetails'
import { Icon } from 'react-native-elements/dist/icons/Icon';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function navi() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen  
        name="Home" 
        component={randomRec}
        
        />
      <Drawer.Screen name="Favourite recipies" component={savedRec} />
      <Drawer.Screen name="Search" component={searchRec} />
   

  </Drawer.Navigator>
  
  );
}

export default function App({navigation}) {
  
  return (

    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen
        name="Home" 
        component={navi}
        options={{
          headerTitle:'Random Recipy',
          headerLeft:() => (
              <Icon
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                name="menu"
              />
          ),
        }} /> 
      <Stack.Screen  name="recDetails" component={recDetails}/>     
      </Stack.Navigator>
    </NavigationContainer>

  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
    
  },

  tabs: {
    
  }

}
);

