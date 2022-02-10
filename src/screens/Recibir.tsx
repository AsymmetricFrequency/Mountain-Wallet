import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Clipboard,
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  Alert,
} from "react-native";
import { readPublicKey } from "../../api";

import LottieView from "lottie-react-native";
import QRCode from "react-native-qrcode-svg";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";


const altura = Platform.OS === "ios" ? 22 : 25;
const windowWidth = Dimensions.get("screen").width;

const Recibir = ({ navigation, route }: { navigation: any; route: any }) => {

  const { pmsg, publicKey } = route.params;

  console.log(publicKey);
  

  const ima = () => {
    if (pmsg == "Condorcoin") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/logocondor.png")}
        />
      );
    } else if (pmsg == "Solana") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/solana.png")}
        />
      );
    } else if (pmsg == "Tether") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/tether.png")}
        />
      );
    }
  };

  const [copiadoModal, setCopiadoModal] = useState(false);
  const [animacion, setAnimacion] = useState(false);
  
  const CopyToClipboard = () => {
    Clipboard.setString(publicKey);
    setAnimacion(true);
    if (Platform.OS === "android") {
      ToastAndroid.show("Dirección copiada", ToastAndroid.SHORT);
    } else {
      Alert.alert("Dirección copiada");
    }
  };
  //Animacion copiado
  const animation = React.useRef(null);
  const amj = (number=0) => {
    if (Platform.OS === "android") {
      number= 2000
    } else if (Platform.OS === "ios") {
      number = 3000
    }
    return number
  }

  React.useEffect(() => {
    if (animacion === true) {
      animation.current.play(0,50);
      setTimeout(() => {
        setAnimacion(false);
      },amj());
    } else if (animacion === false) {
      if (Platform.OS === "android") {
        animation.current.play(18,18);
      } else if (Platform.OS === "ios"){
        animation.current.play(18,50);
      }
    }
  }, [animacion]);

  //funcion s llave publica
  // const [pKey,setPKey] = useState("pubKey")

  // async function obtenerPKey(){
  //     readPublicKey().then((val)=>{
  //         console.log("PUBLIC KEY:");
  //         console.log(val);
  //         setPKey(val)
  //     })
  // }

  // obtenerPKey()

  return (
    <SafeAreaView style={styles.body}>
     
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Recibir {pmsg}</Text>
        </View>
        <View style={styles.logorb}>{ima()}</View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>

        {/* cuadro blanco */}
        {/* Imagen QR */}
        <View style={styles.cuadroQR}>
          <QRCode size={windowWidth * 0.35} value={publicKey} />
        </View>
        {/* Direccion y Copiar */}
        <View style={styles.cajadirecc}>
          <Text style={styles.txtdirecc}>Dirección de cartera</Text>
        </View>
        <TouchableOpacity onPress={() => CopyToClipboard()} activeOpacity={0.5}>
          <View style={styles.tablaqr}>
            <View style={styles.cbtncop}>
              <LottieView
                ref={animation}
                style={styles.lottiecopy}
                source={require("../screens/Lottie/copy.json")}
                autoPlay={false}
                loop={false}
              />
            </View>
            <View style={styles.cuadroqr}>
              <Text numberOfLines={3} style={styles.txtqr}>
                {publicKey}
              </Text>

              {/* <TextInput style={styles.inputqr} value={pKey} editable={false}/> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Recibir;