import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  readMnemonic,
  createAccount,
  savePublicKey,
} from "../../api";
import LottieView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";

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
    <View style={styles.body}>
      <LottieView
        style={styles.lottie}
        source={require("./Lottie/flowerCarga.json")}
        autoPlay
      />
    </View>
  );
};

export default PantallaCarga;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  txtcarga: {
    fontSize: RFValue(18),
    top: RFValue(90),
  },
  fondo: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  lottie: {
    alignItems: "center",
    height: 200,
    justifyContent: "center",
    width: 200,
  },
});
