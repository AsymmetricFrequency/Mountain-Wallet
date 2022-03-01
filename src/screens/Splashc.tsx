import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, Appearance } from "react-native";
import { readPassword } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { Lotiesplash } from "./component/lottie";
import { styles } from "../theme/appTheme";
import { useTheme } from "react-native-paper";

const Splashc = () => {
  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  // const { colors } = useTheme();

  const navigation = useNavigation();
  const [llave, setLlave] = useState("");
  readPassword().then((value) => {
    setLlave(value);
  });

  setTimeout(() => {
    if (llave != null && llave != "" && llave != undefined) {
      navigation.navigate("Pass" as any);
    }
    navigation.navigate("Home" as any);
  }, 3500);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <View
        style={[
          styles.completo,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Lotiesplash />
      </View>
    </SafeAreaView>
  );
};

export default Splashc;
