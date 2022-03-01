import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { readPassword } from "../../api";
import { savePassword } from "../../api";
import { styles } from "../theme/appTheme";
import { Lotierror } from "./component/lottie";

// import { useCalculadora } from '../hooks/useCalculadora';

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const colours = ["white", "#440577"];
const getColour = () => colours[Math.floor(Math.random() * colours.length)];

export const ConfirContra = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  //Variable importada desde contraseña
  const { prePassword } = route.params;
  console.log(prePassword);

  //estado background

  const [colour, setColourUno] = useState("white");
  const [colourDos, setColourDos] = useState("white");
  const [colourTres, setColourTres] = useState("white");
  const [colourCuatro, setColourCuatro] = useState("white");
  const handleClickUno = () => {
    setColourUno(getColour());
  };
  const handleClickDos = () => {
    setColourDos(getColour());
  };
  const handleClickTres = () => {
    setColourTres(getColour());
  };
  const handleClickCuatro = () => {
    setColourCuatro(getColour());
  };

  //Modales
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);
  const [MostrarError, setError] = useState("");
  const [storedPass, setStoredPass] = useState("");

  function validadorPassword() {
    setColourCuatro("white");
    setColourTres("white");
    setColourDos("white");
    setColourUno("white");
    setPin1("");
    setPin2("");
    setPin3("");
    setPin4("");
  }

  // Funcion validador de contraseñas
  function validarPassword() {
    const postPassword = pin1 + pin2 + pin3 + pin4;
    savePassword(postPassword);

    if (postPassword === prePassword) {
      navigation.navigate("PantallaCarga");
    } else {
      setVacioModal(true);
      setError("Contraseña incorrecta.");
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
      //seteo variables contraseña incorrecta
      validadorPassword();
    }
  }
  // Variables de PIN numerico
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  function funcion(numero: string) {
    if (pin1 == "") {
      setPin1(numero);
      setColourUno("#440577");
    } else if (pin1 != "" && pin2 == "") {
      setPin2(numero);
      setColourDos("#440577");
    } else if (pin1 != "" && pin2 != "" && pin3 == "") {
      setPin3(numero);
      setColourTres("#440577");
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin4(numero);
      setColourCuatro("#440577");
    }
  }

  function borrar() {
    if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 != "") {
      setPin4("");
      setColourCuatro("white");
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin3("");
      setColourTres("white");
    } else if (pin1 != "" && pin2 != "" && pin3 == "" && pin4 == "") {
      setPin2("");
      setColourDos("white");
    } else if (pin1 != "" && pin2 == "" && pin3 == "" && pin4 == "") {
      setPin1("");
      setColourUno("white");
    } else if (pin1 == "" && pin2 == "" && pin3 == "" && pin4 == "") {
      console.log("====================================");
      console.log("No hay nada que borrar");
      console.log("====================================");
    }
  }

  return (
    <SafeAreaView style={styles.body}>
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
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Confirmar contraseña</Text>
        </View>
        <View style={styles.contenedorIcon}>
          <Image style={styles.icon} source={require("./img/password.png")} />
        </View>

        <View style={styles.headerCirculos}>
          {/* PRUEBA BOTON BACKGROUND */}
          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colour }]}
            onPress={handleClickUno}
            disabled={true}
          />

          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colourDos }]}
            onPress={handleClickDos}
            disabled={true}
          />

          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colourTres }]}
            onPress={handleClickTres}
            disabled={true}
          />

          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colourCuatro }]}
            onPress={handleClickCuatro}
            disabled={true}
          />
        </View>
        {/* fila uno */}
        <View style={styles.padUno}>
          <TouchableOpacity onPress={() => funcion("1")}>
            <Text style={styles.number}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("2")}>
            <Text style={styles.number}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("3")}>
            <Text style={styles.number}>3</Text>
          </TouchableOpacity>
        </View>
        {/* fila dos */}
        <View style={styles.padDos}>
          <TouchableOpacity onPress={() => funcion("4")}>
            <Text style={styles.number}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("5")}>
            <Text style={styles.number}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("6")}>
            <Text style={styles.number}>6</Text>
          </TouchableOpacity>
        </View>
        {/* fila tres */}
        <View style={styles.padTres}>
          <TouchableOpacity onPress={() => funcion("7")}>
            <Text style={styles.number}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("8")}>
            <Text style={styles.number}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("9")}>
            <Text style={styles.number}>9</Text>
          </TouchableOpacity>
        </View>
        {/* fila cero */}
        <View style={styles.padCero}>
          <TouchableOpacity onPress={() => funcion("0")}>
            <Text style={styles.numberCero}>0</Text>
          </TouchableOpacity>
        </View>
        {/* fila boton borrar */}
        <View style={styles.borrar}>
          <TouchableOpacity onPress={() => borrar()} style={styles.tcBorrar}>
            <Icon name="backspace" size={25} style={{ color: "#440577" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.contBtn}>
          <TouchableOpacity
            style={styles.btnDone}
            onPress={() => validarPassword()}
          >
            <Text style={styles.txtDone}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
