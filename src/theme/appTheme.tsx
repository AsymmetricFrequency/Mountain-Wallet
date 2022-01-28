import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const colores = {};
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("window").height;
const screenHeight = Dimensions.get("window").height;
const spaceH = windowHeight - screenHeight;
const alturaios = Platform.OS === "ios" ? "11%" : "2%";
const radios = Platform.OS === "ios" ? 10 : 15;
const topios = Platform.OS === "ios" ? 0 : 28;
const bottomios = Platform.OS === "ios" ? 50 : StatusBar.currentHeight;
const cirios = Platform.OS === "ios" ? 50 : 40;

const SLIDER_WIDTH = Dimensions.get("screen").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FBF7FF",
    height: windowHeight,
    width: windowWidth,
    // flex:1
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
    bottom: RFValue(58)
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
    right:RFValue(20),
    zIndex: 3,
    elevation: 3,
    marginTop:RFValue(53)
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
  cajaatras:{
    position: "absolute",
    left:RFValue(20),
    zIndex: 3,
    elevation: 3,
    marginTop:RFValue(53)
  },
  titlecc: {
    marginTop:RFValue(53),
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
  carusel:{
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
  txtpag:{
    marginTop: RFValue(56),
    width:RFValue(90),
    height:RFValue(25),
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    color: "#440577",
    fontSize: RFValue(17),
    textAlign: "center",
  },
  cajabtn:{
    alignItems: "center", 
    zIndex: 3,
    elevation: 3,
    bottom:RFValue(-70),
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
    width:60,
    height:60,
  },
  lottiexito: {
      width:200,
      height:200,
  },
  lottieqr: {
      width:380,
      height:380,

  },
  lottiesplash: {
    width: RFValue(336),
    height: RFValue(289),
  },
  //Fin lottie
  //Balance
  
  //Fin balance

});
