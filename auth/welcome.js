import React from 'react';
import { ThemeProvider, Button } from 'react-native-elements';
import { login } from '../styling/theme';
import { View } from 'react-native';


export default function SignUp({ navigation, route }) {

  return (

    <ThemeProvider theme={login}>
      <View style = {{paddingTop: 250}}>
        <Button
          title='Sign in'
          onPress={() => navigation.navigate('SignIn')}
        />
        <Button
          title='Sign up'
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </ThemeProvider>


  );
}