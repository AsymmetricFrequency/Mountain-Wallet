import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import "react-native-url-polyfill/auto";

import { readKey } from './api';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Balance from './src/screens/Balance';
import Crearcuenta from './src/screens/Crearcuenta';
import Home from './src/screens/Home';
import ImportarCuenta from './src/screens/Importarcuenta';
import Importar from './src/screens/Importar';
import CodigoVerificacion from './src/screens/CodigoVerificacion'
import Recibir from './src/screens/Recibir';
import Splashc from './src/screens/Splashc';
import PassLogin from './src/screens/PassLogin'
import QrReader from './src/screens/QrReader';
import PantallaCarga from './src/screens/PantallaCarga';


export default function App() { 

  const Stack = createNativeStackNavigator();
  
  const [llave, setLlave] = useState("")
  
  readKey().then((value) => {
    setLlave(value)
  })

  if (llave != null && llave != '' && llave != undefined) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splashc} options={{headerShown: false}}/>
          <Stack.Screen name="Pass" component={PassLogin} options={{headerShown: false}}/>
          <Stack.Screen name="Balance" component={Balance} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="Recibir" component={Recibir} options={{headerShown: false}}/>
          <Stack.Screen name="Enviar" component={Importar} options={{headerShown: false}}/>
          <Stack.Screen name="QrReader" component={QrReader} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splashc} options={{headerShown: false}}/>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="ImportarCuenta" component={ImportarCuenta} options={{headerShown: false}}/>
          <Stack.Screen name="Crear" component={Crearcuenta} options={{headerShown: false}}/>
          <Stack.Screen name="PantallaCarga" component={PantallaCarga} options={{headerShown: false}}/>
          <Stack.Screen name="CrearPass" component={CodigoVerificacion} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="Balance" component={Balance} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="Recibir" component={Recibir} options={{headerShown: false}}/>
          <Stack.Screen name="Enviar" component={Importar} options={{headerShown: false}}/>
          <Stack.Screen name="QrReader" component={QrReader} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  boton: {
    marginTop: 50
  }
});
