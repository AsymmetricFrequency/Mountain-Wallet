import React, { useEffect, useState } from "react";
import {

  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  StatusBar,
  SafeAreaView,
} from "react-native";

// Fuente
import * as Font from "expo-font";

import { styles } from "../theme/appTheme";

const Home = ({ navigation }: { navigation: any }) => {
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
    <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={styles.completo}>
        <Image
          style={styles.logocolor}
          source={require("./img/logocolor.png")}
        />

        <View style={styles.btncr}>
          <TouchableOpacity
            style={styles.btnc}
            activeOpacity={0.5}
            onPress={() => generarMnemonic()}
          >
            <Text style={styles.txtc}>CREAR NUEVA CARTERA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnr}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("ImportarCuenta")}
          >
            <Text style={styles.txtr}>RESTAURAR CARTERA</Text>
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
