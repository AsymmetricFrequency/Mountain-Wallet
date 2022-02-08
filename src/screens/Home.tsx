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

// Fuente
import * as Font from "expo-font";

import { styles } from "../theme/appTheme";

const Home = ({ navigation }: { navigation: any }) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  function generarMnemonic() {
    navigation.navigate("Slider");
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  //Función fuentes tipograficas

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });
  const loadFonts = async () => {
    await Font.loadAsync({
      //Fuente
      "opensans-regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <SafeAreaView style={[styles.body, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[styles.completo, { backgroundColor: colors.background }]}>
        <Image
          style={styles.logocolor}
          source={
            theme === "light"
              ? require("./img/logocolor.png")
              : require("./img/logocolorDark.png")
          }
        />
        <View style={styles.btncr}>
          <TouchableOpacity
            style={[styles.btnc, { backgroundColor: colors.text }]}
            activeOpacity={0.5}
            onPress={() => generarMnemonic()}
          >
            <Text style={[styles.txtc, { color: colors.background }]}>
              CREAR NUEVA CARTERA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnr, { backgroundColor: colors.text }]}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Restaurar")}
          >
            <Text style={[styles.txtr, { color: colors.background }]}>
              RESTAURAR CARTERA
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cajadevep}>
          <Text style={styles.txtdevep}>DEVELOPED BY CONDOR LAB</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
