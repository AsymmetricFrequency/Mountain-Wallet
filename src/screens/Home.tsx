import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  StatusBar,
  SafeAreaView,
  Appearance,
} from "react-native";
import { useTheme } from "react-native-paper";
import { generateMnemonic } from "../../api";

import { styles } from "../theme/appTheme";

const Home = ({ navigation }: { navigation: any }) => {
  function crearMnemonic() {
    const memo = generateMnemonic();
    memo.then((value) => {
      console.log(value);
      setTimeout(() => {
        navigation.navigate("Slider");
      }, 1000);
    });
  }
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    // <SafeAreaView style={[styles.body, { backgroundColor: colors.background }]}>
    <SafeAreaView style={styles.body}>
      {/* <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      /> */}
      {/* <View style={[styles.completo, { backgroundColor: colors.background }]}> */}
      <View style={styles.completo}>
        <Image
          style={styles.logocolor}
          source={require("./img/logocolor.png")}
        />
        <View style={styles.btncr}>
          <TouchableOpacity
            style={styles.btnc}
            activeOpacity={0.5}
            onPress={() => crearMnemonic()}
          >
            <Text style={styles.txtc}>CREAR NUEVA CARTERA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnr}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Restaurar")}
          >
            <Text style={styles.txtr}>RESTAURAR CARTERA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
