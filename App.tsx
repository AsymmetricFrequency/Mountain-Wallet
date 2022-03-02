import React, { useState } from "react";

import {
  Image,
  useColorScheme,
  Appearance,
  Platform,
  Text,
} from "react-native";

import "react-native-url-polyfill/auto";

import { readPassword } from "./api";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

//screens
import Balance from "./src/screens/Balance";
import Crearcuenta from "./src/screens/Crearcuenta";
import Home from "./src/screens/Home";
import Recibir from "./src/screens/Recibir";
import Splashc from "./src/screens/Splashc";
import QrReader from "./src/screens/QrReader";
import PantallaCarga from "./src/screens/PantallaCarga";
import Ajustes from "./src/screens/Ajustes";
import Slider from "./src/screens/Slider";
import Moneda from "./src/screens/Moneda";
import { Contraseña } from "./src/screens/Contraseña";
import DocePalabras from "./src/screens/DocePalabras";
import { ConfirContra } from "./src/screens/ConfirContra";
import { PassLogin } from "./src/screens/PassLogin";
import Editar from "./src/screens/Edituser";
import Exclave from "./src/screens/Exclave";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EnviarCantidad from "./src/screens/EnviarCantidad";
import EnviarDireccion from "./src/screens/EnviarDireccion";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import Restaurar from "./src/screens/Restaurar";
import ExFrase from "./src/screens/ExFrase";
import TranFallida from "./src/screens/TranFallida";
import TranExitosa from "./src/screens/TranExitosa";
import SinInternet from "./src/screens/SinInternet";

const Tab = createBottomTabNavigator();
//Detecta el sistema en navigator
const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    //slider
    primary: "#8B39CD",
    //contrario
    text: "#FBF7FF",
    //igual
    background: "#440577",
    //negro
    accent: "#FBF7FF",
    //bordeazul
    surface: "#00FFFF",
    //Morado negro
    disabled: "#FBF7FF",
    //Morado gris
    placeholder: "#E2DBEE",
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,

    primary: "#440577",
    text: "#440577",
    background: "#FBF7FF",
    accent: "#4D4D4D",
    surface: "#E2DBEE",
    disabled: "#4D4D4D",
    placeholder: "#440577",
  },
};

const barios = Platform.OS === "ios" ? 65 : 54;

function Barra() {
  const { colors } = useTheme();
  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: RFValue(barios),
          backgroundColor: "#FBF7FF",
          borderTopColor: "#FBF7FF",
          elevation: 0,
        },

        tabBarIcon: ({ focused }) => {
          let imagenes;
          if (route.name === "Balance") {
            imagenes = focused
              ? require("./src/screens/img/walletcolor.png")
              : require("./src/screens/img/walletblanco.png");
          } else if (route.name === "Ajustes") {
            imagenes = focused
              ? require("./src/screens/img/settingscolor.png")
              : require("./src/screens/img/settingsblanco.png");
          }
          return (
            <Image
              source={imagenes}
              style={{
                height: RFValue(34.4),
                width: RFValue(33.3),
                resizeMode: "contain",
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Balance" component={Balance} />
      <Tab.Screen name="Ajustes" component={Ajustes} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  const [llave, setLlave] = useState("");
  const scheme = useColorScheme();

  readPassword().then((value) => {
    setLlave(value);
  });

  if (llave != null && llave != "" && llave != undefined) {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          >
            <Stack.Screen
              name="Splash"
              component={Splashc}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SinInternet"
              component={SinInternet}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pass"
              component={PassLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Barra"
              component={Barra}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Moneda"
              component={Moneda}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Recibir"
              component={Recibir}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnviarCantidad"
              component={EnviarCantidad}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnviarDireccion"
              component={EnviarDireccion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TranFallida"
              component={TranFallida}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TranExitosa"
              component={TranExitosa}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QrReader"
              component={QrReader}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Editar"
              component={Editar}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Exclave"
              component={Exclave}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="ExFrase"
              component={ExFrase}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  } else {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          >
            <Stack.Screen
              name="Splash"
              component={Splashc}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SinInternet"
              component={SinInternet}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Slider"
              component={Slider}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Restaurar"
              component={Restaurar}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Crear"
              component={Crearcuenta}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DocePalabras"
              component={DocePalabras}
              options={{ headerShown: false }}
            /> 
            <Stack.Screen
              name="Contraseña"
              component={Contraseña}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConfirContra"
              component={ConfirContra}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PantallaCarga"
              component={PantallaCarga}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Barra"
              component={Barra}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Moneda"
              component={Moneda}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Recibir"
              component={Recibir}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnviarCantidad"
              component={EnviarCantidad}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnviarDireccion"
              component={EnviarDireccion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TranFallida"
              component={TranFallida}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TranExitosa"
              component={TranExitosa}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QrReader"
              component={QrReader}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Editar"
              component={Editar}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Exclave"
              component={Exclave}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="ExFrase"
              component={ExFrase}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
