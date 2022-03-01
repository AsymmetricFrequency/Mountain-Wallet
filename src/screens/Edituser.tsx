import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Appearance,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { saveUser, readUser } from "../../api";
import * as Animatable from "react-native-animatable";
import { Lotierror } from "./component/lottie";
const altura = Platform.OS === "ios" ? 22 : 25;


const Edituser = ({ navigation, route }: { navigation: any; route: any }) => {
  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  // const { colors } = useTheme();

  const [value, setValue] = useState("");

  //Funcion guardar nuevo nombre de billetera
  function guardarNewUser() {
    if (value == "") {
      setVacioModal(true);
      setError("Nombre de usuario vacío.");
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
    } else if (value.length > 10) {
      setVacioModal(true);
      setError("Número de carácteres superado en el nombre.");
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
    } else {
      saveUser(value);
      navigation.navigate("Ajustes", { nuevoUsuario: value });
    }
  }


    //Modales
    const [anmt, setanmt] = useState("");
    const [vacioModal, setVacioModal] = useState(false);
    const [MostrarError, setError] = useState("");

  return (
    <SafeAreaView style={styles.body}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.completo}
        scrollEnabled={false}
      >
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
        <View style={styles.titlecc}>
          <Text style={[styles.titlex, { left: 20 }]}>
            Cambiar nombre de usuario
          </Text>
        </View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <View style={styles.cajauser}>
          <TextInput
            style={styles.inputuser}
            autoFocus={true}
            onChangeText={(text) => setValue(text)}
          ></TextInput>
        </View>
        <View style={styles.cajabtneuser}>
          <TouchableOpacity
            style={styles.btnDone}
            activeOpacity={0.5}
            onPress={() => guardarNewUser()}
          >
            <Text style={styles.txtDone}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Edituser;
