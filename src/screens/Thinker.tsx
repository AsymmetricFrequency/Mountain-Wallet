import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { readPassword } from "../../api";

const Thinker = ({ navigation }: { navigation: any }) => {

    const [llave, setLlave] = useState("");
    readPassword().then((value) => {
        console.log("Este es el valor"+value);
        setLlave(value);
    });

    function navegar() {
        if (llave === null) {
          navigation.navigate("Splash", {text: "Home"});
        } else if (llave != "") {
          navigation.navigate("Splash", {text: "Pass"});
        }
    }

    useEffect(() => {
        navegar()
    }, [llave])

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Thinker