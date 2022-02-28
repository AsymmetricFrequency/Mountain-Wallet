import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  RefreshControl,
  Clipboard,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { readMnemonic } from "../../api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";

import { readPublicKey } from "../../api";

const altura = Platform.OS === "ios" ? 22 : 25;

const elements: string[] = [];
const doceIncompleta: string[] = [];
const arr: number[] = [];

function leerMnemonic() {
  const mnemonic = readMnemonic();

  mnemonic.then((value) => {
    const docePalabras = value;
    const words = docePalabras.split(" ");
    for (let index = 0; index < 12; index++) {
      elements.push(words[index]);
      doceIncompleta.push(words[index]);
    }
  });
  //recorre las tres palabras restantes
  setTimeout(() => {
    while (arr.length < 3) {
      var r = Math.floor(Math.random() * 11) + 1;
      if (arr.indexOf(r) === -1) {
        arr.push(r);
        elements[r] = elements[r];
      }
    }
  }, 1);
}

const ExFrase = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [animacion, setAnimacion] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    if (elements.length === 0) {
      leerMnemonic();
    } else {
      console.log("lleno");
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 5);
  }, []);

  const frase = `${elements[0]} ${elements[1]} ${elements[2]} ${elements[3]} ${elements[4]} ${elements[5]} ${elements[6]} ${elements[7]} ${elements[8]} ${elements[9]} ${elements[10]} ${elements[11]}`;

  const CopyToClipboard = async () => {
    Clipboard.setString(frase);
    setAnimacion(true);
    if (Platform.OS === "android") {
      ToastAndroid.show("Frase de respaldo copiada", ToastAndroid.SHORT);
    } else {
      Alert.alert("Frase de respaldo copiada");
    }
  };
  //Animacion copiado
  const animation = React.useRef(null);
  const amj = (number = 0) => {
    if (Platform.OS === "android") {
      number = 2000;
    } else if (Platform.OS === "ios") {
      number = 3000;
    }
    return number;
  };
  React.useEffect(() => {
    if (animacion === true) {
      animation.current.play(0, 50);
      setTimeout(() => {
        setAnimacion(false);
      }, amj());
    } else if (animacion === false) {
      if (Platform.OS === "android") {
        animation.current.play(18, 18);
      } else if (Platform.OS === "ios") {
        animation.current.play(18, 50);
      }
    }
  }, [animacion]);

  return (
    <KeyboardAwareScrollView style={styles.body}>
      <ScrollView
        style={{ backgroundColor: "red" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor="#5b298a"
            colors={["#5b298a", "#7e54a7"]}
          />
        }
      ></ScrollView>
      <View style={styles.completo}>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <View style={styles.titlecc}>
          <Text style={styles.titlexx}>Exportar frase de respaldo</Text>
        </View>
        <View style={styles.headerPrimario}>
          {elements.map((j, index) => {
            if (elements[index] === elements[index]) {
              return (
                <TextInput editable={false} style={styles.fondoFrases}>
                  <Text style={styles.txtDoceIncompleta}>
                    {elements[index]}
                  </Text>
                </TextInput>
              );
            }
          })}
        </View>
        <TouchableOpacity onPress={() => CopyToClipboard()} activeOpacity={0.5}>
          <View style={styles.tablaqr}>
            <View style={styles.cbtncop}>
              <LottieView
                ref={animation}
                style={styles.lottiecopy}
                source={require("../screens/Lottie/copy.json")}
                autoPlay={false}
                loop={false}
              />
            </View>
            <View style={styles.cuadroqr}>
              <Text numberOfLines={3} style={styles.txtqr}>
                Copiar frase de respaldo
              </Text>

              {/* <TextInput style={styles.inputqr} value={pKey} editable={false}/> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ExFrase;
