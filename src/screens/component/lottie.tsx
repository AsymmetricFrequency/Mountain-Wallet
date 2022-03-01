import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { styles } from "../../theme/appTheme";

const Lotierror = () => {
  return (
    <LottieView
      style={styles.lottie}
      speed={1.8}
      source={require("../Lottie/error_anim.json")}
      autoPlay
    />
  );
};
const Lotiexito = () => {
  return (
    <LottieView
      style={styles.lottiexito}
      source={require("../Lottie/sucess.json")}
      autoPlay
      loop={false}
    />
  );
};

const Lotieqr = () => {
  return (
    <LottieView
      style={styles.lottieqr}
      source={require("../Lottie/qrscan.json")}
      speed={1}
      autoPlay
      // loop={false}
    />
  );
};

const Lotiesplash = () => {
  return (
    <LottieView
      style={styles.lottiesplash}
      source={require("../Lottie/spashcndr.json")}
      autoPlay
      // loop={false}
    />
  );
};

const Lotiecopy = () => {
  return (
    <LottieView
      style={styles.lottiecopy}
      source={require("../Lottie/copy.json")}
      speed={2.5}
      autoPlay
      loop={true}
    />
  );
};

const Lotiecarga = () => {
  return (
    <LottieView
      style={styles.lottiecarga}
      source={require("../Lottie/pantallacarga.json")}
      autoPlay
      speed={1.1}
    />
  );
};

const LotiecargaDark = () => {
  return (
    <LottieView
      style={styles.lottiecarga}
      source={require("../Lottie/pantallacargaDark.json")}
      autoPlay
      speed={1.1}
    />
  );
};

const Lotiefallido = () => {
  return (
    <LottieView
      style={styles.lottiefallido}
      source={require("../Lottie/tranfallida.json")}
      autoPlay
      loop={false}
      speed={0.6}
    />
  );
};

const Lotiesucces = () => {
  return (
    <LottieView
      style={styles.lottiesucces}
      source={require("../Lottie/tranexitosa.json")}
      autoPlay={true}
      loop={false}
    />
  );
};

const LotiesuccesDark = () => {
  return (
    <LottieView
      style={styles.lottiesucces}
      source={require("../Lottie/sucess.json")}
      autoPlay={true}
      loop={false}
    />
  );
};

const LotieGraficaCondor = () => {
  return (
    <LottieView
      style={styles.lottiecondorchart}
      source={require("../Lottie/construction.json")}
      autoPlay={true}
      loop={false}
      speed={1}
    />
  );
};
const LotieCerrarSesion = () => {
  return (
    <LottieView
      style={styles.lottiecerrars}
      source={require("../Lottie/cerrarsesion.json")}
      autoPlay={true}
      loop={true}
      speed={1}
    />
  );
};

const LotieEnviado = () => {
  return (
    <LottieView
      style={styles.lottiecerrars}
      source={require("../Lottie/enviando.json")}
      autoPlay={true}
      loop={true}
    />
  );
};

export {
  Lotierror,
  Lotiexito,
  Lotieqr,
  Lotiesplash,
  Lotiecopy,
  Lotiecarga,
  LotiecargaDark,
  Lotiefallido,
  Lotiesucces,
  LotiesuccesDark,
  LotieGraficaCondor,
  LotieCerrarSesion,
  LotieEnviado, 
};
