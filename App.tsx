import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
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

const Tab = createBottomTabNavigator();

function Barra() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 65, backgroundColor: "#FBF7FF" },
        tabBarIcon: ({ focused }) => {
          let imagenes;
          if (route.name === "Balance") {
            imagenes = focused
              ? require("./src/screens/img/walletcolor.png")
              : require("./src/screens/img/walletblanco.png");
          } else if (route.name === "Swap") {
            imagenes = focused
              ? require("./src/screens/img/swapcolor.png")
              : require("./src/screens/img/swapblanco.png");
          } else if (route.name === "Ajustes") {
            imagenes = focused
              ? require("./src/screens/img/settingscolor.png")
              : require("./src/screens/img/settingsblanco.png");
          }
          return (
            <Image
              source={imagenes}
              style={{ height: 46, width: 40, resizeMode: "contain" }}
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
            name="ImportarCuenta"
            component={ImportarCuenta}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
  },
  boton: {
    marginTop: 50,
  },
});
