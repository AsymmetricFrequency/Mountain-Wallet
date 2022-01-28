import React, { useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { readKey } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { Lotiesplash } from "./component/lottie";
import { styles } from "../theme/appTheme";

const Splashc = () => {
  const navigation = useNavigation();
  const [llave, setLlave] = useState("");
  readKey().then((value) => {
    setLlave(value);
  });

  setTimeout(() => {
    if (llave != null && llave != "" && llave != undefined) {
      navigation.navigate("Pass" as any);
    }
    navigation.navigate("Home" as any);
  }, 2500);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View
        style={[
          styles.completo,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Lotiesplash />
      </View>
    </SafeAreaView>
  );
};

export default Splashc;
