import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  Modal,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { readMnemonic } from "../../api";
import LottieView from "lottie-react-native";
import { ScrollView } from "react-native-web-hover";
import { Lotierror, Lotiexito } from "./component/lottie";
import { watchFile } from "fs";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

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
        doceIncompleta[r] = "";
      }
    }
  }, 1);
}

const DocePalabras = ({ navigation }: { navigation: any }) => {
  const [content, setContent] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setRefreshing(true);
    leerMnemonic();
    setTimeout(() => {
      setRefreshing(false);
    }, 5);
  }, []);

  console.log("print elements", elements);

  //Modal
  const [anmt, setanmt] = useState("");
  const [MostrarModal, setModal] = useState(false);
  const [MostrarError, setError] = useState("");
  const [lottie, setLottie] = useState(<Lotierror />);
  const [mostrartitulo, setmostrartitulo] = useState("");

  //casillas faltantes
  const [values, setValues] = useState({
    "vacio[1]": "",
  });
  //Esta funcion actualiza y toma lo que esta en la caja de texto
  function handleChange(text: string, eventName: string) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }
  // funcion para añadir las tres palabras restantes al arreglo y comparar que las 3 palabras faltantes sean las correctas
  //con respecto al arreglo original
  function addTresFaltantes() {
    for (let index = 0; index < doceIncompleta.length; index++) {
      if (doceIncompleta[index] === "") {
        doceIncompleta[index] = values["vacio[" + index + "]"];
      }
    }
    let arreglo1 = elements.toString();
    let arreglo2 = doceIncompleta.toString();

    if (arreglo1 === arreglo2) {
      setanmt("fadeInDownBig");
      setmostrartitulo("Correcto");
      setError("Palabras correctas");
      setModal(true);
      setLottie(<Lotiexito />);
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setModal(false);
        }, 100);
        navigation.navigate("Contraseña");
      }, 1000);
    } else {
      //alert("Frases incorrectas");
      setanmt("fadeInDownBig");
      setmostrartitulo("Incorrecto");
      setError("Palabras incorrectas");
      setModal(true);
      setLottie(<Lotierror />);
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setModal(false);
        }, 100);
      }, 1000);
      for (let i = 0; i < doceIncompleta.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (i == arr[j]) {
            doceIncompleta[i] = "";
          }
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <RefreshControl
        refreshing={refreshing}
        tintColor="#5b298a"
        colors={["#5b298a", "#7e54a7"]}
      />

      <Modal
        visible={MostrarModal}
        transparent
        onRequestClose={() => setModal(false)}
        hardwareAccelerated
      >
        <Animatable.View animation={anmt} duration={600}>
          <View style={styles.bodymodal}>
            <View style={styles.ventanamodal}>
              <View style={styles.icontext}>
                <View style={styles.contenedorlottie}>{lottie}</View>
              </View>
              <View style={styles.textnoti}>
                <View style={styles.contenedortext}>
                  <Text style={styles.texticon}>{mostrartitulo}</Text>
                </View>
                <View>
                  <Text style={styles.notificacion}>{MostrarError}</Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </Modal>
      <View style={styles.headerDos}>
        <Text style={styles.headerTitle}>
          Escribe las tres palabras faltantes en tu frase de respaldo.
        </Text>
      </View>
      <View style={styles.headerPrimario}>
        {doceIncompleta.map((j, index) => {
          if (doceIncompleta[index] === "") {
            return (
              <TextInput
                style={styles.fondoFrases}
                onChangeText={(text) =>
                  handleChange(text, "vacio[" + index + "]")
                }
              >
                <Text style={styles.txt}>{doceIncompleta[index]}</Text>
              </TextInput>
            );
          } else {
            return (
              <TextInput style={styles.fondoFrases} editable={false}>
                <Text style={styles.txt}>{doceIncompleta[index]}</Text>
              </TextInput>
            );
          }
        })}
        <View>
          <TouchableOpacity
            style={styles.btnR}
            onPress={() => addTresFaltantes()}
          >
            <Text style={styles.txtContinuar}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const cuadroios = Platform.OS === "ios" ? 55 : 45;
const alturaios = Platform.OS === "ios" ? "11%" : "2%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerDos: {
    margin: 20,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#5B2388",
    fontSize: 20,
    fontWeight: "700",
    marginTop: RFValue(10),
  },

  headerPrimario: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    top: RFValue(80),
  },
  fondoFrases: {
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "#EDE3F4",
    borderWidth: 5,
    borderColor: "white",
    padding: RFValue(10),
    marginVertical: RFValue(5),
    marginHorizontal: RFValue(5),
    width: windowWidth * 0.3,
  },

  btnR: {
    top: RFValue(180),
    alignItems: "center",
    backgroundColor: "#440577",
    borderRadius: 20,
    height: RFValue(50),
    justifyContent: "center",
    width: windowWidth * 0.7,
  },
  txtContinuar: {
    color: "white",
    fontSize: RFValue(20),
    fontWeight: "400",
  },
  txt: {
    //color: "#000",
    fontSize: RFValue(18),
    fontWeight: "400",
  },

  //Modal
  bodymodal: {
    flex: 1,
    alignItems: "center",
  },
  ventanamodal: {
    alignItems: "center",
    backgroundColor: "#5B298A",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 20,
    flexDirection: "row",
    height: windowHeight * 0.1,
    paddingLeft: RFValue(12),
    paddingRight: RFValue(12),
    top: alturaios,
    width: windowWidth * 0.95,
  },
  icontext: {
    alignItems: "center",
  },
  textnoti: {
    //--- No borrar ---//
  },
  contenedorlottie: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    height: 60,
    width: 60,
  },
  contenedortext: {
    justifyContent: "center",
  },
  texticon: {
    color: "white",
    fontSize: RFValue(18),
    fontWeight: "bold",
  },
  notificacion: {
    color: "white",
    fontSize: RFValue(12),
  },
});

export default DocePalabras;
