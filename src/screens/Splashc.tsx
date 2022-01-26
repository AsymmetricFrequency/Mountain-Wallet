import React, { useState } from "react";
import { View } from "react-native";
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
    <View style={styles.body}>
      <View
        style={[
          styles.completo,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Lotiesplash />
      </View>
    </View>
  );
};

export default Splashc;
