import React, { useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import {
  readMnemonic,
  createAccount,
  savePublicKey,
} from "../../api";
import LottieView from "lottie-react-native";
import { styles } from "../theme/appTheme";
const PantallaCarga = ({ navigation }: { navigation: any }) => {
  const [palabras, setPalabras] = useState("");

  async function leerMnemonic() {
    const mnemonic = readMnemonic();
    mnemonic.then((value) => {
      setPalabras(value);
    });
  }

  leerMnemonic();

  //Crear cuenta
  async function crearCuenta() {
    const acc = createAccount()
    acc.then((value) => {
        savePublicKey(value)
        setTimeout(() => {
            navigation.navigate('Barra')
        }, 2000)
    })
}

  setTimeout(() => {
    crearCuenta();
  }, 2000);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={[styles.completo,{justifyContent: "center"}]}>
        <LottieView
          style={styles.lottiecarga}
          source={require("./Lottie/pantallacarga.json")}
          autoPlay
          speed={0.85}
        />
      </View>
    </SafeAreaView>
  );
};

export default PantallaCarga;

