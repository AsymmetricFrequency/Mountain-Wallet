import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  Platform,
  Dimensions,
  Modal,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { Lotierror, Lotieqr } from "./component/lottie";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const QrReader = ({ navigation }: { navigation: any }) => {
  // +++++++++++++++++++++++++++++++++++++++++Qr para iOS+++++++++++++++++++++++++++++++++++++++++

  if (Platform.OS === "ios") {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("");

    //preguntando el permiso para camara
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == "granted");
      })();
    };

    useEffect(() => {
      askForCameraPermission();
    }, []);

    //Constantes modales
    const [anmt, setanmt] = useState("");
    const [aprobado, setaprobado] = useState(false);
    const [MostrarError, setError] = useState("");
    const [lottie, setLottie] = useState(<Lotierror />);
    const [mostrartitulo, setmostrartitulo] = useState("");

    //Handleo del escaneado
    const handleBarCodeScanned = ({ data }) => {
      setScanned(true);
      setText(data);
      Clipboard.setString(data);
      //aqui va el envio de los props
      setmostrartitulo("QR Scaneado");
      setError("Llave pública copiada en el portapapeles:");
      setaprobado(true);
      setLottie(<Lotieqr />);
      setanmt("fadeInDownBig");
    };

    //si el permiso es nulo
    if (hasPermission === null) {
      return <Text>Permiso nulo</Text>;
    }

    //si el permiso es falso
    if (hasPermission === false) {
    }

    //boton volver
    function regresar() {
      setScanned(false);
      navigation.goBack();
    }

    //si el permiso es verdadero
    if (hasPermission === true) {
      return (
        <View style={styles.containeruno}>
          <Modal
            visible={aprobado}
            transparent
            onRequestClose={() => setaprobado(false)}
            hardwareAccelerated
          >
            <View style={styles.cajafull}>
              <Animatable.View animation={anmt} duration={600}>
                <View>
                  <View style={styles.ventanafull}>
                    <View style={styles.contenedortextfull}>
                      <Text style={styles.texticonfull}>{mostrartitulo}</Text>
                    </View>
                    <View style={styles.icontextfull}>
                      <View style={styles.contenedorlottiefull}>{lottie}</View>
                    </View>

                    <View>
                      <Text style={styles.notificacionfull}>
                        {MostrarError}
                      </Text>
                    </View>
                    {/* Texto copiado */}
                    <Text style={styles.copiadotxt}>{text}</Text>
                    {/* Botones modal */}
                    <View style={styles.dcVC}>
                      <View style={styles.dcV}>
                        <TouchableOpacity
                          style={styles.btnVC}
                          activeOpacity={0.5}
                          onPress={() => [
                            setScanned(false),
                            setaprobado(false),
                          ]}
                        >
                          <Text style={styles.textbtnVC}>REESCANEAR</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.dcC}>
                        <TouchableOpacity
                          style={styles.btnVC}
                          activeOpacity={0.5}
                          onPress={() => regresar()}
                        >
                          <Text style={styles.textbtnVC}>CONFIRMAR</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            </View>
          </Modal>

          {/* camara */}
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, styles.colorqr]}
          >
            <View style={styles.tituloqr}>
              <Text style={styles.textqr}>ESCANEAR CÓDIGO QR</Text>
            </View>
            <Animatable.View
              style={styles.barcodebox}
              animation="pulse"
              duration={2000}
              iterationCount={"infinite"}
            ></Animatable.View>
            <View style={styles.cajavolver}>
              <TouchableOpacity
                style={styles.btnvolver}
                activeOpacity={0.5}
                onPress={() => regresar()}
              >
                <Text style={styles.txtvolver}>VOLVER</Text>
              </TouchableOpacity>
            </View>
          </BarCodeScanner>
        </View>
      );
    }
    return (
      // permiso denegado

      <View style={styles.cajaqra}>
        <Animatable.View animation={"fadeInDownBig"} duration={600}>
          <View>
            <View style={styles.ventanaqra}>
              <View style={styles.contenedortextfulla}>
                <Text style={styles.texticonfulla}>Permiso Denegado</Text>
              </View>
              {/* Lottie */}
              <View>
                <LottieView
                  style={styles.lottieqr}
                  source={require("../screens/Lottie/error.json")}
                  speed={2}
                  autoPlay
                />
              </View>
              <View>
                <Text style={styles.notificacionfulla}>
                  Revisa los permisos de la cámara ingresando en configuración,
                  privacidad y cámara.
                </Text>
              </View>
              <View style={styles.cajav}>
                <TouchableOpacity
                  style={styles.btnv}
                  activeOpacity={0.5}
                  onPress={() => regresar()}
                >
                  <Text style={styles.txtv}>VOLVER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    );

    // +++++++++++++++++++++++++++++++++++++++++Qr para Android+++++++++++++++++++++++++++++++++++++++++
  } else if (Platform.OS === "android") {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    //Constantes modales
    const [anmt, setanmt] = useState("");
    const [aprobado, setaprobado] = useState(false);
    const [MostrarError, setError] = useState("");
    const [lottie, setLottie] = useState(<Lotierror />);
    const [mostrartitulo, setmostrartitulo] = useState("");
    const [text, setText] = useState("");

    //boton volver
    function regresar() {
      setScanned(false);
      navigation.goBack();
    }

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);

    if (hasPermission === null) {
      return (
        <View style={styles.cajaqra}>
          <Text>No access nulla</Text>
        </View>
      );
    }
    if (hasPermission === false) {
      return (
        <View style={styles.cajaqra}>
          <Animatable.View animation={"fadeInDownBig"} duration={600}>
            <View>
              <View style={styles.ventanaqra}>
                <View style={styles.contenedortextfulla}>
                  <Text style={styles.texticonfulla}>Permiso Denegado</Text>
                </View>
                {/* Lottie */}
                <View>
                  <LottieView
                    style={styles.lottieqr}
                    source={require("../screens/Lottie/error.json")}
                    speed={2}
                    autoPlay
                  />
                </View>
                <View>
                  <Text style={styles.notificacionfulla}>
                    El permiso de la cámara ha sido denegado
                  </Text>
                </View>
                <View style={styles.cajav}>
                  <TouchableOpacity
                    style={styles.btnv}
                    activeOpacity={0.5}
                    onPress={() => regresar()}
                  >
                    <Text style={styles.txtv}>VOLVER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animatable.View>
        </View>
      );
    }
    if (scanned == true) {
      return (
        <View style={styles.cajaqra}>
          <Animatable.View animation={"fadeInDownBig"} duration={600}>
            <View>
              <View style={styles.ventanaqra}>
                <View style={styles.contenedortextfulla}>
                  <Text style={styles.texticonfulla}>QR Scaneado</Text>
                </View>
                {/* Lottie */}
                <View>
                  <LottieView
                    style={styles.lottieqr}
                    source={require("../screens/Lottie/qrscan2.json")}
                    speed={1}
                    autoPlay
                  />
                </View>

                <View>
                  <Text style={styles.notificacionfulla}>
                    Llave pública copiada en el portapapeles:
                  </Text>
                </View>
                {/* Texto copiado */}
                <Text style={styles.copiadotxta}>{text}</Text>
                {/* Botones modal */}
                <View style={styles.dcVCa}>
                  <View style={styles.dcVa}>
                    <TouchableOpacity
                      style={[styles.btnVCa, { zIndex: 999 }]}
                      activeOpacity={0.5}
                      onPress={() => [setScanned(false), setaprobado(false)]}
                    >
                      <Text style={styles.textbtnVCa}>REESCANEAR</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.dcCa}>
                    <TouchableOpacity
                      style={styles.btnVCa}
                      activeOpacity={0.5}
                      onPress={() => regresar()}
                    >
                      <Text style={styles.textbtnVCa}>CONFIRMAR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Animatable.View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Camera
          onBarCodeScanned={(...args) => {
            const data = args[0].data;
            const result = JSON.stringify(data);
            Clipboard.setString(data);
            setScanned(true);
            setText(data);
          }}
          barCodeScannerSettings={{
            barCodeTypes: ["qr"],
          }}
          style={[styles.colorqra, { flex: 1 }]}
        >
          <View style={styles.tituloqra}>
            <Text style={styles.textqra}>ESCANEAR CÓDIGO QR</Text>
          </View>
          <Animatable.View
            style={styles.barcodeboxa}
            animation="pulse"
            duration={2000}
            iterationCount={"infinite"}
          ></Animatable.View>
          <View style={styles.cajavolvera}>
            <TouchableOpacity
              style={styles.btnvolvera}
              activeOpacity={0.8}
              onPress={() => regresar()}
            >
              <Text style={styles.txtvolvera}>VOLVER</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  // Style iOS
  containeruno: {
    alignItems: "center",
    height: windowHeight,
    paddingTop: RFValue(35),
    paddingLeft: RFValue(15),
    paddingRight: RFValue(15),
    width: windowWidth,
  },
  tituloqr: {
    alignItems: "center",
    backgroundColor: "rgba(29, 29, 27, 0.45)",
    borderRadius: 15,
    position: "absolute",
    padding: RFValue(20),
    top: RFValue(60),
  },
  textqr: {
    color: "white",
  },
  colorqr: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "5%",
    paddingRight: "4%",
  },
  barcodebox: {
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.45)",
    height: windowHeight * 0.5,
    width: windowWidth * 0.9,
  },
  cajavolver: {
    alignItems: "center",
    bottom: RFValue(60),
    position: "absolute",
  },
  btnvolver: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    paddingHorizontal: RFValue(50),
    paddingVertical: RFValue(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  txtvolver: {
    color: "#5b298a",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },

  // Modal
  cajafull: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(91, 41, 137, 1)",
    justifyContent: "center",
  },
  ventanafull: {
    alignItems: "center",
    height: windowHeight * 0.15,
    flexDirection: "column",
    width: windowWidth * 0.95,
  },
  contenedortextfull: {
    justifyContent: "center",
  },
  texticonfull: {
    color: "white",
    fontSize: RFValue(25),
    fontWeight: "bold",
    top: RFValue(-140),
  },
  icontextfull: {
    alignItems: "center",
    top: RFValue(-150),
  },
  contenedorlottiefull: {
    alignItems: "center",
    justifyContent: "center",
  },
  notificacionfull: {
    color: "white",
    fontSize: RFValue(16),
    textAlign: "center",
    top: RFValue(-80),
  },
  copiadotxt: {
    color: "#b9b8b8",
    fontSize: RFValue(16),
    textAlign: "center",
    top: RFValue(-70),
  },
  dcVC: {
    borderRadius: 10,
    flexDirection: "row",
    padding: RFValue(15),
    top: RFValue(-50),
  },
  dcV: {
    width: RFValue(143),
  },
  dcC: {
    width: RFValue(143),
  },
  btnVC: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    marginRight: RFValue(15),
    marginLeft: RFValue(15),
    paddingTop: RFValue(12),
    paddingBottom: RFValue(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textbtnVC: {
    color: "#5b298a",
    fontWeight: "bold",
    fontSize: RFValue(11.5),
  },

  // Style Android
  container: {
    flex: 1,
  },
  cajaqra: {
    alignItems: "center",
    backgroundColor: "rgba(91, 41, 137, 1)",
    height: windowHeight,
    justifyContent: "center",
    width: windowWidth,
  },
  ventanaqra: {
    alignItems: "center",
    justifyContent: "center",
  },
  contenedortextfulla: {
    justifyContent: "center",
    top: RFValue(0),
  },
  texticonfulla: {
    color: "white",
    fontSize: RFValue(25),
    fontWeight: "bold",
  },
  lottieqr: {
    height: 380,
    width: 380,
  },
  notificacionfulla: {
    color: "white",
    fontSize: RFValue(16),
    paddingHorizontal: RFValue(12),
    textAlign: "center",
    top: RFValue(-50),
  },
  copiadotxta: {
    color: "#b9b8b8",
    fontSize: RFValue(16),
    paddingHorizontal: RFValue(20),
    textAlign: "center",
    top: RFValue(-40),
  },
  dcVCa: {
    borderRadius: 10,
    bottom: RFValue(0),
    flexDirection: "row",
    padding: RFValue(15),
  },
  dcVa: {
    width: RFValue(143),
  },
  dcCa: {
    width: RFValue(143),
  },
  btnVCa: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    marginRight: RFValue(15),
    marginLeft: RFValue(15),
    paddingTop: RFValue(12),
    paddingBottom: RFValue(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textbtnVCa: {
    color: "#5b298a",
    fontWeight: "bold",
    fontSize: RFValue(11.5),
    zIndex: 999,
  },

  //camara
  colorqra: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "5%",
    paddingRight: "4%",
  },
  tituloqra: {
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "rgba(29, 29, 27, 0.45)",
    padding: RFValue(20),
    top: RFValue(-40),
  },
  textqra: {
    color: "white",
  },
  barcodeboxa: {
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.4,
    width: windowWidth * 0.8,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.45)",
  },
  cajavolvera: {
    alignItems: "center",
    bottom: RFValue(-40),
  },
  btnvolvera: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    paddingHorizontal: RFValue(50),
    paddingVertical: RFValue(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  txtvolvera: {
    color: "#5b298a",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
  cajav: {
    alignItems: "center",
  },
  btnv: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    paddingHorizontal: RFValue(50),
    paddingVertical: RFValue(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  txtv: {
    color: "#5b298a",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
});

export default QrReader;
