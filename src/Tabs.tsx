import * as React from 'react'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from '../stacks/HomeStack';


const Tabs = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Base" component={HomeStack} options={{ headerShown: false }}></Stack.Screen>
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Tabs