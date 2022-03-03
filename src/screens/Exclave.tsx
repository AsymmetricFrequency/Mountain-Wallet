import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image,
  Appearance,
  Clipboard,
  ToastAndroid,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "react-native-paper";
import LottieView from "lottie-react-native";

const altura = Platform.OS === "ios" ? 22 : 25;

const Exclave = ({ navigation, route }: { navigation: any; route: any }) => {
  const secretKey = route.params?.llave_privada;
  const [animacion, setAnimacion] = useState(false);

  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  // const { colors } = useTheme();

  const [cambio, setCambio] = useState(false);

  const mostrar = () => {
    setCambio(true);
  };

  const CopyToClipboard = async () => {
    Clipboard.setString(secretKey);
    setAnimacion(true);
    if (Platform.OS === "android") {
      ToastAndroid.show("Clave privada copiada", ToastAndroid.SHORT);
    } else {
      Alert.alert("Clave privada copiada");
    }
  };
  //Animacion copiado
  const animation = React.useRef(null);
  const amj = (number = 0) => {
    if (Platform.OS === "android") {
      number = 2000;
    } else if (Platform.OS === "ios") {
      number = 3000;
    }
    return number;
  };
  React.useEffect(() => {
    if (animacion === true) {
      animation.current.play(0, 50);
      setTimeout(() => {
        setAnimacion(false);
      }, amj());
    } else if (animacion === false) {
      if (Platform.OS === "android") {
        animation.current.play(18, 18);
      } else if (Platform.OS === "ios") {
        animation.current.play(18, 50);
      }
    }
  }, [animacion]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titlex}>Exportar clave privada</Text>
        </View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.navigate('Ajustes')}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scroll}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <Image
            style={styles.imgex}
            source={require("./img/opacity-rerstaurar-mnemonic.png")}
          />
          <View style={styles.cajaex}>
            {cambio === true ? (
              <Text style={{ color: "#440577" }}>[{secretKey}]</Text>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={styles.cajabtnex}>
            <TouchableOpacity
              style={styles.btnDone}
              activeOpacity={0.5}
              onPress={mostrar}
              disabled={cambio}
            >
              <Text style={styles.txtDonex}>Mostrar clave privada</Text>
            </TouchableOpacity>
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
                  Copiar clave privada
                </Text>

                {/* <TextInput style={styles.inputqr} value={pKey} editable={false}/> */}
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Exclave;
