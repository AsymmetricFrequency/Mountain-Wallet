import React, { useState } from "react";
import { Image, useColorScheme, Appearance } from "react-native";
import "react-native-url-polyfill/auto";

import { readKey } from "./api";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Balance from "./src/screens/Balance";
import Crearcuenta from "./src/screens/Crearcuenta";
import Home from "./src/screens/Home";
import ImportarCuenta from "./src/screens/Importarcuenta";
import Importar from "./src/screens/Importar";
import CodigoVerificacion from "./src/screens/CodigoVerificacion";
import Recibir from "./src/screens/Recibir";
import Splashc from "./src/screens/Splashc";
import QrReader from "./src/screens/QrReader";
import PantallaCarga from "./src/screens/PantallaCarga";
import Swap from "./src/screens/Swap";
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

const Tab = createBottomTabNavigator();
//Detecta el sistema en navigator
const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00FFFF",
    text: "#E2DBEE",
    background: "#440577",
  },
};

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#E2DBEE",
    text: "#440577",
    background: "#FBF7FF",
  },
};

function Barra() {
  const { colors } = useTheme();
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: RFValue(65),
          backgroundColor: colors.background,
          borderTopColor: colors.background,
          elevation: 0,
        },
        tabBarIcon: ({ focused }) => {
          let imagenes;
          if (route.name === "Balance") {
            imagenes = focused
              ? theme == "dark"
                ? require("./src/screens/img/walletcolorDark.png")
                : require("./src/screens/img/walletcolor.png")
              : require("./src/screens/img/walletblanco.png");
          } else if (route.name === "Swap") {
            imagenes = focused
              ? theme == "dark"
                ? require("./src/screens/img/swapcolorDark.png")
                : require("./src/screens/img/swapcolor.png")
              : require("./src/screens/img/swapblanco.png");
          } else if (route.name === "Ajustes") {
            imagenes = focused
              ? theme == "dark"
                ? require("./src/screens/img/settingscolorDark.png")
                : require("./src/screens/img/settingscolor.png")
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
      <Tab.Screen name="Swap" component={Swap} />
      <Tab.Screen name="Ajustes" component={Ajustes} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  const [llave, setLlave] = useState("");

  readKey().then((value) => {
    setLlave(value);
  });

  const scheme = useColorScheme();

  if (llave != null && llave != "" && llave != undefined) {
    return (
      <NavigationContainer>
        <Stack.Screen
          name="Splash"
          component={Splashc}
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
          name="Recibir"
          component={Recibir}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Enviar"
          component={Importar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QrReader"
          component={QrReader}
          options={{ headerShown: false }}
        />
      </NavigationContainer>
    );
  } else {
    return (
      <PaperProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splashc}
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
            {/* <Stack.Screen
              name="ImportarCuenta"
              component={ImportarCuenta}
              options={{ headerShown: false }}
            /> */}
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
              name="Enviar"
              component={Importar}
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
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
