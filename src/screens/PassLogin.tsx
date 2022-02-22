import React, { useRef, useState } from "react";
import { Text, View, Image, Modal, StatusBar, Appearance } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { readPassword, savePassword } from "../../api";
import { styles } from "../theme/appTheme";
import { useTheme } from "react-native-paper";

export const PassLogin = ({ navigation }: { navigation: any }) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
    //Borar estado color
    if (
      theme === "light" &&
      pin1 === "" &&
      pin2 === "" &&
      pin3 === "" &&
      pin4 === ""
    ) {
      setPin1("");
      setPin2("");
      setPin3("");
      setPin4("");
      setColourUno(colors.background);
      setColourDos(colors.background);
      setColourTres(colors.background);
      setColourCuatro(colors.background);
    } else if (
      theme === "dark" &&
      pin1 === "" &&
      pin2 === "" &&
      pin3 === "" &&
      pin4 === ""
    ) {
      setPin1("");
      setPin2("");
      setPin3("");
      setPin4("");
      setColourUno(colors.background);
      setColourDos(colors.background);
      setColourTres(colors.background);
      setColourCuatro(colors.background);
    }
  });

  const { colors } = useTheme();

  //estado background
  const [colour, setColourUno] = useState(colors.background);
  const [colourDos, setColourDos] = useState(colors.background);
  const [colourTres, setColourTres] = useState(colors.background);
  const [colourCuatro, setColourCuatro] = useState(colors.background);

  //Modales
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  const [storedPass, setStoredPass] = useState("");

  readPassword().then((val) => {
    setStoredPass(val);
  });

  function validarPassword() {
    const password = pin1 + pin2 + pin3 + pin4;

    if (password == storedPass) {
      navigation.navigate("Barra");
    } else {
      setVacioModal(true);
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 900);
      //seteo variables contraseña incorrecta
      setPin1("");
      setPin2("");
      setPin3("");
      setPin4("");
      setColourUno(colors.background);
      setColourDos(colors.background);
      setColourTres(colors.background);
      setColourCuatro(colors.background);
    }
  }

  // Referencias para salto input
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  function funcion(numero: string) {
    if (pin1 == "") {
      setPin1(numero);
      setColourUno(colors.text);
    } else if (pin1 != "" && pin2 == "") {
      setPin2(numero);
      setColourDos(colors.text);
    } else if (pin1 != "" && pin2 != "" && pin3 == "") {
      setPin3(numero);
      setColourTres(colors.text);
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin4(numero);
      setColourCuatro(colors.text);
    }
  }

  function borrar() {
    if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 != "") {
      setPin4("");
      setColourCuatro(colors.background);
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin3("");
      setColourTres(colors.background);
    } else if (pin1 != "" && pin2 != "" && pin3 == "" && pin4 == "") {
      setPin2("");
      setColourDos(colors.background);
    } else if (pin1 != "" && pin2 == "" && pin3 == "" && pin4 == "") {
      setPin1("");
      setColourUno(colors.background);
    } else if (pin1 == "" && pin2 == "" && pin3 == "" && pin4 == "") {
      console.log("====================================");
      console.log("No hay nada que borrar");
      console.log("====================================");
    }
  }

  return (
    <SafeAreaView style={[styles.body, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
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
                  <LottieView
                    style={styles.lottie}
                    source={require("./Lottie/error.json")}
                    autoPlay
                  />
                </View>
              </View>
              <View style={styles.textnoti}>
                <View style={styles.contenedortext}>
                  <Text style={styles.texticon}>Error</Text>
                </View>
                <View>
                  <Text style={styles.notificacion}>Contraseña incorrecta</Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </Modal>
      <View style={[styles.completo, { backgroundColor: colors.background }]}>
        <View style={styles.titlecc}>
          <Text style={[styles.titletx, { color: colors.text }]}>
            Ingrese contraseña
          </Text>
        </View>
        <View style={styles.contenedorIcon}>
          <Image style={styles.icon} source={require("./img/password.png")} />
        </View>

        <View style={styles.headerCirculos}>
          {/* PRUEBA BOTON BACKGROUND */}
          <TouchableOpacity
            style={[
              styles.circUno,
              { backgroundColor: colour, borderColor: colors.text },
            ]}
            // onPress={handleClickUno}
            disabled={true}
          />

          <TouchableOpacity
            style={[
              styles.circUno,
              { backgroundColor: colourDos, borderColor: colors.text },
            ]}
            // onPress={handleClickDos}
            disabled={true}
          />

          <TouchableOpacity
            style={[
              styles.circUno,
              { backgroundColor: colourTres, borderColor: colors.text },
            ]}
            // onPress={handleClickTres}
            disabled={true}
          />

          <TouchableOpacity
            style={[
              styles.circUno,
              { backgroundColor: colourCuatro, borderColor: colors.text },
            ]}
            // onPress={handleClickCuatro}
            disabled={true}
          />
        </View>
        {/* fila uno */}
        <View style={styles.padUno}>
          <TouchableOpacity onPress={() => funcion("1")}>
            <Text style={[styles.numberP, { color: colors.text }]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("2")}>
            <Text style={[styles.numberP, { color: colors.text }]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("3")}>
            <Text style={[styles.numberP, { color: colors.text }]}>3</Text>
          </TouchableOpacity>
        </View>
        {/* fila dos */}
        <View style={styles.padDos}>
          <TouchableOpacity onPress={() => funcion("4")}>
            <Text style={[styles.numberP, { color: colors.text }]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("5")}>
            <Text style={[styles.numberP, { color: colors.text }]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("6")}>
            <Text style={[styles.numberP, { color: colors.text }]}>6</Text>
          </TouchableOpacity>
        </View>
        {/* fila tres */}
        <View style={styles.padTres}>
          <TouchableOpacity onPress={() => funcion("7")}>
            <Text style={[styles.numberP, { color: colors.text }]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("8")}>
            <Text style={[styles.numberP, { color: colors.text }]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => funcion("9")}>
            <Text style={[styles.numberP, { color: colors.text }]}>9</Text>
          </TouchableOpacity>
        </View>
        {/* fila cero */}
        <View style={styles.padCero}>
          <TouchableOpacity onPress={() => funcion("0")}>
            <Text style={[styles.numberP, { color: colors.text }]}>0</Text>
          </TouchableOpacity>
        </View>
        {/* fila boton borrar */}
        <View style={styles.borrar}>
          <TouchableOpacity onPress={() => borrar()} style={styles.tcBorrar}>
            <Icon
              name="backspace-outline"
              size={32}
              style={{ color: colors.text }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contBtn}>
          <TouchableOpacity
            style={[styles.btnDone, { backgroundColor: colors.text }]}
            onPress={() => validarPassword()}
          >
            <Text style={[styles.txtDone, { color: colors.background }]}>
              CONFIRMAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
