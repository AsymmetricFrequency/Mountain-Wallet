import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { styles } from "../../theme/appTheme";

const Lotierror = () => {
  return (
    <LottieView
      style={styles.lottie}
      speed={2}
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
      source={require("../Lottie/logocolor.json")}
      autoPlay
      // loop={false}
    />
  );
};

export { Lotierror, Lotiexito, Lotieqr, Lotiesplash };
