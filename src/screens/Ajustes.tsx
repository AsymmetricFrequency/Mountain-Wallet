import {
  Appearance,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
  Modal
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { AsyncStorage } from 'react-native';
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { readPublicKey, readKey, readUser } from "../../api";
import { LotieCerrarSesion} from "./component/lottie";

const altura = Platform.OS === "ios" ? 22 : 25;

const Ajustes = ({ navigation, route }: { navigation: any; route: any }) => {

  //Modales
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  //Funcion para cerrar sesion y eliminar todos los datos del async storage 
  const deleteAllData = () => {
    
    setVacioModal(true);
    setanmt("zoomIn");
    setTimeout(() => {
      setanmt("zoomOut");
      setTimeout(() => {
        setVacioModal(false);
      }, 100);
      navigation.navigate("Home")
    }, 3000);
    setTimeout(()=>{
      AsyncStorage.clear(() => {});
    },3500)
  };

  const [publicKey, setPublicKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  //Variable obtenida de pantalla Edituser
  var userNew = route.params?.nuevoUsuario;
  console.log(userNew);

  //funcion leer nombre de usuario
  const [usuario, setUsuario] = useState("");
  readUser().then((val) => {
    setUsuario(val);
  });

  async function setearLlaves() {
    const llavePublica = readPublicKey();
    const llavePrivada = readKey();
    llavePublica.then((value) => {
      setPublicKey(value);
    });
    llavePrivada.then((value) => {
      setSecretKey(value);
    });
  }

  setearLlaves();

  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  // const { colors } = useTheme();
  // Concatenar pkey
  var str = publicKey;
  var strFirstThree = str.substring(0, 5);
  var strLastThree = str.substring(str.length - 5, str.length);
  var concatenado = `${strFirstThree}...${strLastThree}`;

 

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
        <View style={styles.cajafull}>
          <Animatable.View animation={anmt} duration= {600}>
            <View style={styles.ventanafull}>
              <View style={styles.icontextfull}>
                  <View style={styles.contenedorlottiefull}>
                      <LotieCerrarSesion/>
                      <View style={{position:"absolute"}}>
                        <Icons name="logout" size={25} color="white" />
                      </View>                       
                  </View>
              </View>
            </View>
          </Animatable.View>
          </View>
      </Modal>
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Configuración</Text>
        </View>
        <Image
          style={styles.logosintxt}
          source={require("./img/logocolor.png")}
        />
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
          <View style={styles.cajaaj}>
            <View style={styles.useraj}>
              <View style={styles.btnaj}>
                <Icon name="user-circle" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtuaj}>
              <Text style={styles.contaj}>
                {userNew !== "" && usuario}
                {userNew == "" && userNew}
              </Text>
              <Text style={styles.contuaj}>{concatenado}</Text>
            </View>
            <TouchableOpacity
              style={styles.editaj}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Editar")}
            >
              <View>
                <Icons name="pencil" size={altura} color="#E2DBEE" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cajaaj}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("ExFrase")}
          >
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icon name="arrow-down" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={styles.contaj}>Exportar frase de respaldo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cajaaj}
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate("Exclave", { llave_privada: secretKey })
            }
          >
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icons name="cellphone-key" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={styles.contaj}>Exportar llave privada</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cajaaj} activeOpacity={0.5} onPress={() => deleteAllData()} >
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icons name="logout" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={styles.contaj}>Cerrar Sesion</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Ajustes;
