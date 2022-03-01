import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  Modal,
  Dimensions,
  Alert,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { styles } from "../theme/appTheme";
import { readPassword, saveUser } from "../../api";
import { Lotierror } from "./component/lottie";
import { ConfirContra } from "./ConfirContra";

const altura = Platform.OS === "ios" ? 22 : 25;

// import { useCalculadora } from '../hooks/useCalculadora';

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

//backgroud contraseña
const colours = ["#FBF7FF", "#440577"];
const getColour = () => colours[Math.floor(Math.random() * colours.length)];

export const Contraseña = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [password1, setPassword1] = useState({ pass1: "" });

  let cosa = route.params?.pipo;
  console.log(cosa);

  //Funcion para generar usuario aleatorio
  function generateRandomUser(len) {
    let randomUser = "Usuario_";
    let wordChars = "0123456789";

    for (let i = 0; i < len; i++) {
      randomUser += wordChars.charAt(
        Math.floor(Math.random() * wordChars.length)
      );
    }

    if (cosa !== undefined) {
      saveUser(cosa);
    } else {
      saveUser(randomUser);
    }
  }

  generateRandomUser(6);

  //Estado background

  const [colour, setColourUno] = useState("#FBF7FF");
  const [colourDos, setColourDos] = useState("#FBF7FF");
  const [colourTres, setColourTres] = useState("#FBF7FF");
  const [colourCuatro, setColourCuatro] = useState("#FBF7FF");
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

  function validadorPassword() {
    setColourCuatro("#FBF7FF");
    setColourTres("#FBF7FF");
    setColourDos("#FBF7FF");
    setColourUno("#FBF7FF");
    setPin1("");
    setPin2("");
    setPin3("");
    setPin4("");
  }

  function genPassword() {
    password1.pass1 = pin1 + pin2 + pin3 + pin4;
    const antipass = password1.pass1;
    console.log(antipass);
    if (antipass.length === 4) {
      navigation.navigate("ConfirContra", { prePassword: antipass });
    } else {
      validadorPassword();
      setVacioModal(true);
      setError("Contraseña inválida.");
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
    }
  }

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
      setColourCuatro("#FBF7FF");
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin3("");
      setColourTres("#FBF7FF");
    } else if (pin1 != "" && pin2 != "" && pin3 == "" && pin4 == "") {
      setPin2("");
      setColourDos("#FBF7FF");
    } else if (pin1 != "" && pin2 == "" && pin3 == "" && pin4 == "") {
      setPin1("");
      setColourUno("#FBF7FF");
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
          <Text style={styles.titletx}>Ingrese contraseña</Text>
        </View>
        <View style={styles.contenedorIcon}>
          <Image style={styles.icon} source={require("./img/password.png")} />
        </View>

        <View style={styles.headerCirculos}>
          {/* PRUEBA BOTON BACKGROUND */}
          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colour }]}
            //onPress={handleClickUno}
            disabled={true}
          />

          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colourDos }]}
            //onPress={handleClickDos}
            disabled={true}
          />

          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colourTres }]}
            //onPress={handleClickTres}
            disabled={true}
          />

          <TouchableOpacity
            style={[styles.circUno, { backgroundColor: colourCuatro }]}
            //onPress={handleClickCuatro}
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
            onPress={() => genPassword()}
          >
            <Text style={styles.txtDone}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // </View>
  );
};
