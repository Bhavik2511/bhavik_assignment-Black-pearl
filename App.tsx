
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import MapComponent from './MapComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import QRComponent from './QRComponent';
const Stack = createNativeStackNavigator();



function App(){
 return(
  <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen name="MapComponent" component={MapComponent} />
      <Stack.Screen name="QRComponent" component={QRComponent}/>

    </Stack.Navigator>
  </NavigationContainer>
 )
}

const styles = StyleSheet.create({
 
});

export default App;
