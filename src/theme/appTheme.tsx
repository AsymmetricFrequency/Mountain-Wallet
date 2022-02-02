import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const colores = {};
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("window").height;
const screenHeight = Dimensions.get("window").height;
const spaceH = windowHeight - screenHeight;
const alturaios = Platform.OS === "ios" ? "11%" : "2%";
const radios = Platform.OS === "ios" ? 10 : 15;
const saldoios = Platform.OS === "ios" ? 0.87 : 0.85;
const bottomios = Platform.OS === "ios" ? 60 : StatusBar.currentHeight;
const cirios = Platform.OS === "ios" ? 0 : 25;

const SLIDER_WIDTH = Dimensions.get("screen").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

// balance
const anchocaja = Platform.OS === "ios" ? 115 : 124;
const paddinrightios = Platform.OS === "ios" ? 15 : 12;
const barios = Platform.OS === "ios" ? 15 : 40;
const barios2 = Platform.OS === "ios" ? 15 : 0;

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FBF7FF",
    height: windowHeight,
    width: windowWidth,
    flex: 1,
  },
  completo: {
    backgroundColor: "#FBF7FF",
    alignItems: "center",
    flex: 1,
  },
  logocolor: {
    marginTop: RFValue(70),
    width: RFValue(336),
    height: RFValue(289),
    resizeMode: "contain",
  },
  btncr: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(17),
  },
  btnc: {
    backgroundColor: "#440577",
    borderRadius: radios,
    width: RFValue(245),
    height: RFValue(48.44),
    justifyContent: "center",
  },
  txtc: {
    fontSize: RFValue(17),
    fontWeight: "400",
    color: "#FBF7FF",
    textAlign: "center",
  },
  btnr: {
    backgroundColor: "#440577",
    borderRadius: radios,
    width: RFValue(245),
    height: RFValue(48.44),
    justifyContent: "center",
    marginTop: RFValue(42),
  },
  txtr: {
    fontSize: RFValue(17),
    textAlign: "center",
    fontWeight: "400",
    color: "#FBF7FF",
  },
  cajadevep: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: RFValue(58),
  },
  txtdevep: {
    fontSize: RFValue(14),
    fontWeight: "400",
    color: "#CFC3E4",
    textAlign: "center",
    justifyContent: "center",
  },

  // Slider
  introImageStyle: {
    width: RFValue(185),
    height: RFValue(184.5),
    resizeMode: "contain",
    marginTop: RFValue(64.18),
  },
  cajatitle: {
    marginTop: RFValue(49.9),
    width: RFValue(229),
    height: RFValue(118),
    alignItems: "center",
    justifyContent: "center",
  },
  introTitleStyle: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#4D4D4D",
    textAlign: "center",
  },
  cajatxt: {
    justifyContent: "center",
    width: RFValue(217),
    height: RFValue(68.4),
    marginTop: RFValue(53),
  },
  introTextStyle: {
    fontSize: RFValue(13),
    fontWeight: "400",
    color: "#4D4D4D",
    textAlign: "center",
    justifyContent: "center",
  },
  cajadone: {
    position: "absolute",
    right: RFValue(20),
    zIndex: 3,
    elevation: 3,
    marginTop: RFValue(53),
  },
  btndo: {
    alignItems: "center",
    backgroundColor: "#E2DBEE",
    borderRadius: 30,
    width: RFValue(40),
    height: RFValue(40),
    justifyContent: "center",
    zIndex: 3,
    elevation: 3,
  },
  dotst: {
    backgroundColor: "#C4C4C4",
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: 25,
    marginHorizontal: RFValue(21),
    marginBottom: RFValue(50),
  },
  actist: {
    backgroundColor: "#440577",
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: 25,
    marginHorizontal: RFValue(21),
    marginBottom: RFValue(50),
  },
  //Fin Slider
  //Modal
  bodymodal: {
    alignItems: "center",
    flex: 1,
  },
  ventanamodal: {
    alignItems: "center",
    backgroundColor: "#5B298A",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 20,
    height: windowHeight * 0.1,
    flexDirection: "row",
    paddingLeft: RFValue(12),
    paddingRight: RFValue(12),
    top: alturaios,
    width: windowWidth * 0.95,
  },
  icontext: {
    alignItems: "center",
  },
  textnoti: {},
  contenedorlottie: {
    alignItems: "center",
    justifyContent: "center",
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
  //Fin Modal
  //Crear Cuenta
  cajacc: {
    alignItems: "center",
    // bottom: StatusBar.currentHeight,
    flexDirection: "column",
    // paddingTop: topios,
  },
  cajaatras: {
    position: "absolute",
    left: RFValue(20),
    zIndex: 3,
    elevation: 3,
    marginTop: RFValue(53),
  },
  titlecc: {
    marginTop: RFValue(53),
    width: "100%",
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
  },
  titletx: {
    color: "#440577",
    fontSize: RFValue(23),
    fontWeight: "bold",
  },
  txtcc: {
    marginTop: RFValue(84),
    width: RFValue(212),
    height: RFValue(95),
    alignItems: "center",
  },
  txttx: {
    color: "#4D4D4D",
    fontSize: RFValue(23),
    fontWeight: "bold",
    textAlign: "center",
  },
  carusel: {
    alignItems: "center",
    marginTop: RFValue(123),
    justifyContent: "center",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    color: "#4D4D4D",
    fontSize: RFValue(25),
    fontWeight: "bold",
  },
  txtpag: {
    marginTop: RFValue(56),
    width: RFValue(90),
    height: RFValue(25),
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    color: "#440577",
    fontSize: RFValue(17),
    textAlign: "center",
  },
  cajabtn: {
    alignItems: "center",
    zIndex: 3,
    elevation: 3,
    bottom: RFValue(-70),
  },
  btnDone: {
    backgroundColor: "#440577",
    borderRadius: 15,
    width: RFValue(201),
    height: RFValue(41.7),
    justifyContent: "center",
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  txtDone: {
    color: "#fff",
    fontSize: RFValue(21),
    textAlign: "center",
    justifyContent: "center",
  },
  //Fin Crearcuenta
  //Lottie
  lottie: {
    width: 60,
    height: 60,
  },
  lottiexito: {
    width: 60,
    height: 60,
  },
  lottieqr: {
    width: 380,
    height: 380,
  },
  lottiesplash: {
    width: RFValue(336),
    height: RFValue(289),
  },
  lottiecopy: {
    width: 53,
    height: 53,
  },
  //Fin lottie
  //Balance
  logocolorB: {
    width: RFValue(192),
    height: RFValue(192),
    resizeMode: "contain",
    marginTop: RFValue(47),
  },
  balancecry: {
    flex: 1,
    paddingHorizontal: RFValue(17),
    marginTop: RFValue(35),
  },
  tablacry: {
    borderColor: "#e0e0e0",
    borderRadius: 26,
    borderWidth: 0.8,
    height: RFValue(60),
    flexDirection: "row",
    marginVertical: RFValue(9),
    paddingLeft: RFValue(10),
    paddingRight: RFValue(20),
    backgroundColor: "#E2DBEE",
  },
  logocry: {
    justifyContent: "center",
    width: "15%",
    alignItems: "center",
  },
  imgcry: {
    height: windowHeight * 0.12,
    resizeMode: "contain",
    width: windowWidth * 0.12,
  },
  nombrecry: {
    justifyContent: "center",
    paddingLeft: RFValue(8),
    width: "40%",
  },
  ntxtcry: {
    color: "#000",
    fontFamily: "opensans-regular",
    fontSize: RFValue(15),
    fontWeight: "500",
  },
  smcry: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "45%",
  },
  saldocry: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  stxtcry: {
    color: "#440577",
    fontSize: RFValue(23),
    fontWeight: "400",
  },
  monedacry: {
    justifyContent: "center",
  },
  mtxtcry: {
    color: "#440577",
    fontFamily: "Roboto",
    fontSize: RFValue(8.5),
    fontWeight: "400",
  },

  //Fin balance
  //Moneda
  logomoneda: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(45),
  },
  imgmoneda: {
    width: RFValue(170),
    height: RFValue(150),
    resizeMode: "contain",
  },
  cajamon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(10),
  },
  montxt: {
    color: "#000",
    fontWeight: "700",
    fontSize: RFValue(23),
  },
  dcER: {
    flexDirection: "row",
    marginTop: RFValue(20),
    paddingVertical: RFValue(12),
    borderTopColor: "#E2DBEE",
    borderTopWidth: 1,
    borderBottomColor: "#E2DBEE",
    borderBottomWidth: 1,
    marginHorizontal: RFValue(25.5),
  },
  dcR: {
    width: "50%",
    alignItems: "flex-end",
  },
  dcE: {
    width: "50%",
    alignItems: "flex-start",
  },
  btnR: {
    width: RFValue(121),
    height: RFValue(37.5),
    alignItems: "center",
    backgroundColor: "#5b298a",
    borderRadius: 10,
    justifyContent: "center",
  },
  textbtnR: {
    color: "white",
    fontSize: RFValue(21.25),
    fontWeight: "400",
  },
  cajasf: {
    marginTop: RFValue(15),
    marginHorizontal: RFValue(25.5),
    alignItems: "center",
    justifyContent: "center",
  },
  saldofull: {
    fontSize: RFValue(20),
    color: "#440577",
  },
  sombras: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  //FinMoneda
  //Recibir
  logorb: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(12.5),
  },
  cuadroQR: {
    width: RFValue(161),
    height: RFValue(161),
    borderColor: "#E2DBEE",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(25),
  },
  cajadirecc: {
    width: RFValue(171),
    height: RFValue(21.7),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(36),
  },
  txtdirecc: {
    fontSize: RFValue(11.5),
    fontWeight: "500",
    color: "#B3B3B3",
  },
  tablaqr: {
    flexDirection: "row",
    width: RFValue(238),
    height: RFValue(64),
    marginTop: RFValue(29),
    paddingHorizontal: RFValue(8),
  },
  cbtncop: {
    width: "25%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  btncop: {
    alignItems: "center",
    borderRadius: 10,
    padding: RFValue(5),
  },
  cuadroqr: {
    justifyContent: "center",
    width: "72%",
  },
  txtqr: {
    color: "#440577",
    fontSize: RFValue(13),
    fontWeight: "500",
  },

  //FinRecibir
  //Doce Palabras
  headerDos: {
    height: RFValue(45.93),
    width: RFValue(320.46),
    marginTop: RFValue(51.625),
    justifyContent: "center",
  },
  headerTitle: {
    color: "#5B2388",
    fontSize: RFValue(17),
    fontWeight: "700",
  },
  headerPrimario: {
    marginTop: 54,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  fondoFrases: {
    textAlign: "center",
    borderRadius: 3,
    backgroundColor: "#FBF7FF",
    borderWidth: 1,
    borderColor: "#5B2388",
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(5),
    width: RFValue(99.05),
    height: RFValue(24.22),
  },
  contenImg: {
    alignItems: "center",
    marginTop: RFValue(40.5),
  },
  imgRestaurar: {
    height: RFValue(228.86),
    width: RFValue(266.08),
    resizeMode: "contain",
  },
  btnContinuar: {
    marginTop: RFValue(27.125),
    alignItems: "center",
    backgroundColor: "#440577",
    borderRadius: 10,
    height: RFValue(49.28),
    justifyContent: "center",
    width: RFValue(134.98),
  },
  txtContinuar: {
    color: "#FBF7FF",
    fontSize: RFValue(21.25),
    fontWeight: "400",
  },
  txtDoceIncompleta: {
    color: "#440577",
    fontSize: RFValue(13),
    fontWeight: "700",
  },
});
