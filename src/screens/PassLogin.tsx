import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { readPassword, savePassword } from "../../api";
// import { useCalculadora } from '../hooks/useCalculadora';

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const colours = ["white", "#440577"];
const getColour = () => colours[Math.floor(Math.random() * colours.length)];

export const PassLogin = ({ navigation }: { navigation: any }) => {
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
      setColourUno("white");
      setColourDos("white");
      setColourTres("white");
      setColourCuatro("white");
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
    <View style={styles.container}>
      <SafeAreaView>
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
                    <Text style={styles.notificacion}>
                      Contraseña incorrecta
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Animatable.View>
        </Modal>
        <View style={styles.headerConfi}></View>
        <View style={styles.headerDos}>
          <View>
            <Text style={styles.headerTitle}>Ingrese contraseña</Text>
          </View>
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
        <View style={styles.numpadUno}>
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
        <View style={styles.numpadDos}>
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
        <View style={styles.numpadTres}>
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
        <View style={styles.numpadTres}>
          <TouchableOpacity onPress={() => funcion("0")}>
            <Text style={styles.numberCero}>0</Text>
          </TouchableOpacity>
        </View>
        {/* fila boton borrar */}
        <View style={styles.borrar}>
          <TouchableOpacity onPress={() => borrar()}>
            <Icon name="backspace-outline" style={styles.btnBorrar} />
          </TouchableOpacity>
        </View>
        <View style={styles.contBtn}>
          <TouchableOpacity
            style={styles.btnR}
            onPress={() => validarPassword()}
          >
            <Text style={styles.textbtnR}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const alturaios = Platform.OS === "ios" ? "11%" : "2%";
const cuadroios = Platform.OS === "ios" ? 55 : 45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerConfi: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 55,
    paddingLeft: 10,
  },
  headerDos: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    bottom: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#440577",
  },
  contenedorIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    bottom: RFValue(15),
    height: 150,
    width: 150,
  },
  headerCirculos: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    height: RFValue(-40),
  },
  numpadUno: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 80,
  },
  numpadDos: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 80,
  },
  numpadTres: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 80,
  },
  numberPad: {
    alignSelf: "center",
  },
  number: {
    color: "#4D4D4D",
    fontWeight: "bold",
    flexDirection: "row",
    fontSize: 24,
    marginHorizontal: 45,
  },
  numberCero: {
    alignItems: "center",
    color: "#4D4D4D",
    fontWeight: "bold",
    flexDirection: "row",
    fontSize: 24,
  },
  iconConfig: {
    flexDirection: "row",
  },
  borrar: {
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "row",
    width: 65,
    height: 60,
    marginHorizontal: 285,
    marginVertical: -68,
    marginBottom: RFValue(-15),
  },
  btnBorrar: {
    fontSize: 30,
  },
  contBtn: {
    flexDirection: "row",
    justifyContent: "center",
    height: RFValue(50),
    marginHorizontal: RFValue(57),
    top: RFValue(15),
    margin: RFValue(20),
    width: RFValue(240),
  },
  btnR: {
    alignItems: "center",
    backgroundColor: "#440577",
    borderRadius: 20,
    height: RFValue(50),
    justifyContent: "center",
    width: RFValue(240),
  },
  textbtnR: {
    color: "white",
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  labeldos: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    margin: 8,
    justifyContent: "center",
  },

  //Estilo circulos contraseña
  circUno: {
    borderColor: "#440577",
    borderRadius: 100,
    borderWidth: 1,
    fontSize: RFValue(15),
    height: RFValue(cuadroios),
    justifyContent: "center",
    marginHorizontal: 10,
    //margin: RFValue(5),
    marginTop: RFValue(12),
    textAlign: "center",
    width: RFValue(cuadroios),
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