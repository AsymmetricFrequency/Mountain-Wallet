import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const colores = {};
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const screenHeight = Dimensions.get("window").height;
const spaceH = windowHeight - screenHeight;

const radios = Platform.OS === "ios" ? 10 : 15;
const fontios = Platform.OS === "ios" ? 12 : 14;
const fontdeios = Platform.OS === "ios" ? 9 : 10;
const deios = Platform.OS === "ios" ? -30 : -38;
const cirios = Platform.OS === "ios" ? -160 : -215;
export const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FBF7FF",
    height: windowHeight,
    width: windowWidth,
  },
  completo: {
    paddingTop: RFValue(31),
    paddingLeft: RFValue(49),
    paddingRight: RFValue(49),
  },
  caja: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logocolor: {
    width: RFValue(244),
    height: RFValue(244),
    marginBottom: RFValue(9),
    resizeMode: "contain",
  },
  btncr: {
    width: RFValue(202),
    height: RFValue(134),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: RFValue(205),
  },
  btnc: {
    backgroundColor: "#440577",
    borderRadius: radios,
    marginBottom: RFValue(34),
    width: RFValue(202),
    height: RFValue(46),
    justifyContent: "center",
  },
  txtc: {
    fontSize: RFValue(fontios),
    fontWeight: "400",
    color: "#FBF7FF",
    textAlign: "center",
  },
  btnr: {
    backgroundColor: "#440577",
    borderRadius: radios,
    width: RFValue(202),
    height: RFValue(46),
    justifyContent: "center",
  },
  txtr: {
    fontSize: RFValue(fontios),
    textAlign: "center",
    fontWeight: "400",
    color: "#FBF7FF",
  },
  cajadevep: {
    bottom: deios,
  },
  txtdevep: {
    fontSize: RFValue(fontdeios),
    fontWeight: "400",
    color: "rgba(207,195,228,1)",
    textAlign: "center",
    justifyContent: "center",
  },

  // Slider
  sli:{
    flex:1,
    alignItems: 'center', 
    paddingTop:RFValue(89),
  },
  introImageStyle: {
    width: RFValue(166),
    height: RFValue(197),
    resizeMode: 'contain',
  },
  cajatitle:{
    justifyContent: "center",
    width: RFValue(225),
    height: RFValue(122),
    marginBottom: RFValue(35),
  },
  introTitleStyle: {
    //30
    fontSize:RFValue(25),
    fontWeight: 'bold',
    color: "#4D4D4D",
    textAlign: "center",
  },
  cajatxt:{
    justifyContent: "center",
    width: RFValue(218),
    height: RFValue(66),
    marginBottom: RFValue(120),
  },
  introTextStyle: {
    //16
    fontSize: RFValue(13),
    fontWeight: "400",
    color: "#4D4D4D",
    textAlign: "center",
    justifyContent: "center",
  },
  btnDone: {
    borderRadius: 15,
    backgroundColor: "rgba(68,5,119,1)",
    width: 200,
    height: 42,
    justifyContent: "center",
    elevation: 5,
  },
  txtDone: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    justifyContent: "center",
  },
  dotst:{
    backgroundColor: '#C4C4C4',
    width:RFValue(28), 
    height:RFValue(28), 
    borderRadius:25,
    marginHorizontal:RFValue(21),
    bottom : StatusBar.currentHeight,
    marginBottom:RFValue(190)
  },
  actist:{
    backgroundColor: '#440577',
    width:RFValue(28), 
    height:RFValue(28), 
    borderRadius:25,
    marginHorizontal:RFValue(21),
    bottom : StatusBar.currentHeight,
    marginBottom:RFValue(190)
  },

});
