import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Appearance,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { saveUser, readUser } from "../../api";
const altura = Platform.OS === "ios" ? 22 : 25;

const Edituser = ({ navigation, route }: { navigation: any; route: any }) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  const [value, setValue] = useState("");

  //Funcion guardar nuevo nombre de billetera
  function guardarNewUser() {
    if (value == "") {
      //Pendiente hacer modal para esta alerta
      alert("Porfavor escriba nombre de usuario");
    } else if (value.length > 10) {
      //Pendiente hacer modal para esta alerta
      alert("Permitido solo 10 caracteres");
    } else {
      saveUser(value);
      navigation.navigate("Ajustes", { nuevoUsuario: value });
    }
  }

  console.log(value);

  return (
    <SafeAreaView style={styles.body}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.completo}
        scrollEnabled={false}
      >
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
