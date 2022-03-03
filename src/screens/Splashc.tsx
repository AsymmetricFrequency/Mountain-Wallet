import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { Lotiesplash } from "./component/lottie";
import { styles } from "../theme/appTheme";

const Splashc = ({ navigation, route }: { navigation: any; route: any }) => {

  const texto = route.params?.text;
  
  function navegar() {
    if (texto == "Pass") {
      navigation.navigate("Pass")
    } else if (texto == "Home") {
      navigation.navigate("Home")
    }
  }

  setTimeout(() => {
    navegar()
  }, 4000);

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
