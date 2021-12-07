import * as React from 'react'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Balance from '../src/screens/Balance';
import ImportarCuenta from '../src/screens/Importarcuenta';
import Recibir from '../src/screens/Recibir';
import Importar from '../src/screens/Importar';
import Home from '../src/screens/Home';
import Crearcuenta from '../src/screens/Crearcuenta';
import CodigoVerificacion from '../src/screens/CodigoVerificacion';
import Splashc from '../src/screens/Splashc';


const HomeStack = () => {
    const HomeStack = createNativeStackNavigator();
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <HomeStack.Screen name="Crearcuenta" component={Crearcuenta} options={{ headerShown: false }}/>
                <HomeStack.Screen name="Importarcuenta" component={ImportarCuenta} options={{ headerShown: false }}/>
                <HomeStack.Screen name="CodigoVerificacion" component={CodigoVerificacion} options={{ headerShown: false }}/>
                <HomeStack.Screen name="Balance" component={Balance} options={{ headerShown: false }}/>
                <HomeStack.Screen name="Recibir" component={Recibir} options={{ headerShown: false }}/>
                <HomeStack.Screen name="Importar" component={Importar} options={{ headerShown: false }}/>

            </HomeStack.Navigator>

        )
    }


export default HomeStack
