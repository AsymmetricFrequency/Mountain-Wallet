import React, { useState } from "react";
import { View, Appearance, SafeAreaView, StatusBar } from "react-native";
import {
  readMnemonic,
  createAccount,
  savePublicKey,
} from "../../api";
import LottieView from "lottie-react-native";
import { useTheme } from 'react-native-paper';
import { styles } from "../theme/appTheme";


const PantallaCarga = ({ navigation }: { navigation: any }) => {
  //Detecta el modo del sistema
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
  const { colors } = useTheme();

  const [palabras, setPalabras] = useState("");

  async function leerMnemonic() {
    const mnemonic = readMnemonic();
    mnemonic.then((value) => {
      setPalabras(value);
    });
  }

  leerMnemonic();

  //Crear cuenta
  async function crearCuenta(mnemonic: string) {
      const acc = createAccount(mnemonic)
      acc.then((value) => {
          setTimeout(() => {
              navigation.navigate('Barra')
          }, 2000)
      })
}

  setTimeout(() => {
    crearCuenta(palabras);
  }, 2000);

  return (
    <SafeAreaView style={[styles.body,{backgroundColor:colors.background}]}>
      <StatusBar 
        backgroundColor= {colors.background}
        barStyle={theme === 'dark' ?  "light-content" : "dark-content"} 
      />
      <View style={[styles.completo,{backgroundColor:colors.background,justifyContent: "center",alignItems: "center"}]}>
        <LottieView
          style={styles.lottiecarga}
          source={require("./Lottie/pantallacarga.json")}
          autoPlay
          speed={1.1}
        />
      </View>
    </SafeAreaView>
  );
};

export default PantallaCarga;

