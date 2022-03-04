import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
  RefreshControl,
  StatusBar,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { readMnemonic } from "../../api";
import { Lotierror, Lotiexito } from "./component/lottie";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

var elements: string[] = [];
var doceIncompleta: string[] = [];
var arr: number[] = [];

const altura = Platform.OS === "ios" ? 22 : 25;

function leerMnemonic(palabras: []) {
  console.log("Entre a la funcion");
    for (let index = 0; index < palabras.length; index++) {
      elements.push(palabras[index]);
      doceIncompleta.push(palabras[index]);
    }
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

const DocePalabras = ({ navigation, route }: { navigation: any, route: any }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const frase = route.params?.msg

  useEffect(() => {
    setRefreshing(true);

    if (elements.length === 0) {
      leerMnemonic(frase);
    } else {
      console.log("lleno");
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 5);
  }, []);

  console.log(elements);

  //Modales
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);
  const [MostrarError, setError] = useState("");

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
      doceIncompleta = []
      elements = []
      arr = []
      navigation.navigate("Contraseña");
    } else {
      //alert("Frases incorrectas");
      setVacioModal(true);
      setError("Palabras incorrectas.");
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
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
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <Modal
        visible={vacioModal}
        transparent
        onRequestClose={() => setVacioModal(false)}
        hardwareAccelerated
      >
        <Animatable.View animation={anmt} duration={600}>
          <View style={styles.bodymodal}>
            <View style={styles.ventanamodal}>
              <View style={styles.icontext}>
                <View style={styles.contenedorlottie}>
                  <Lotierror/>
                </View>
              </View>
              <View style={styles.textnoti}>
                <View style={styles.contenedortext}>
                  <Text style={styles.texticon}>Error</Text>
                </View>
                <View>
                  <Text style={styles.notificacion}>{MostrarError}</Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </Modal>
      <View style={styles.completo}>
        <View style={styles.headerDos}>
          <Text style={styles.headerTitle}>
            Escribe las tres palabras {"\n"}faltantes en tu frase de {"\n"}
            respaldo.
          </Text>
        </View>
        <View style={styles.headerPrimario}>
          {doceIncompleta.map((j, index) => {
            if (doceIncompleta[index] === "") {
              return (
                <TextInput
                  key={index}
                  autoCapitalize="none"
                  style={styles.fondoFrases}
                  onChangeText={(text) =>
                    handleChange(text, "vacio[" + index + "]")
                  }
                >
                  <Text style={styles.txtDoceIncompleta}>
                    {doceIncompleta[index]}
                  </Text>
                </TextInput>
              );
            } else {
              return (
                <TextInput
                  key={index}
                  style={styles.fondoFrases}
                  editable={false}
                >
                  <Text style={styles.txtDoceIncompleta}>
                    {doceIncompleta[index]}
                  </Text>
                </TextInput>
              );
            }
          })}
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnContinuar}
            onPress={() => addTresFaltantes()}
          >
            <Text style={styles.txtContinuar}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default DocePalabras;
