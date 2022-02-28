import {
  Clipboard,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  Appearance,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../theme/appTheme";
import { TextInput } from "react-native-gesture-handler";
import { saveMmemonic, saveUser } from "../../api";
import { useTheme } from "react-native-paper";

const altura = Platform.OS === "ios" ? 22 : 25;
//
const Restaurar = ({ navigation, route }: { navigation: any; route: any }) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  const [values, setValues] = useState("");
  const elements: string[] = [];
  const words = values.split(" ");
  for (let index = 0; index < 12; index++) {
    elements.push(words[index]);
  }

  const [userRestaurar, setUserRestaurar] = useState("");
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  function continuar() {
    if (values == "") {
      alert("Porfavor escriba su frase secreta");
    } else if (words.length != 12) {
      alert("Solo se permite 12 palabras");
    } else if (userRestaurar == "") {
      alert("Porfavor escriba nombre de billetera");
    } else if (userRestaurar.length > 10) {
      alert("Permitido solo 10 caracteres");
    } else {
      saveMmemonic(values);
      navigation.navigate("Contraseña", { pipo: userRestaurar });
    }
  }
  console.log(words);
  const [copiedText, setCopiedText] = useState("");

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[styles.body]}
      scrollEnabled={false}
    >
      <View style={styles.completo}>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <View style={styles.contenedorCajaRest}>
          <View style={styles.cajaFrase}>
            <TextInput
              style={styles.txtInputRest}
              multiline={true}
              autoCapitalize="none"
              placeholder={"Por favor ingresa tu frase de respaldo."}
              placeholderTextColor="#AEA3C6"
              onChangeText={(text) => setValues(text)}
            >
              {copiedText}
            </TextInput>
          </View>
          <View style={styles.btnCopiar}>
            <TouchableOpacity
              style={styles.cntdClipboard}
              onPress={() => fetchCopiedText()}
            >
              <Image
                style={styles.clipboardRes}
                source={require("./img/Paste-clipboard.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cntdrNameBll}>
          <TextInput
            style={styles.txtNombreBll}
            placeholder={"Nombre de la billetera"}
            placeholderTextColor="#AEA3C6"
            onChangeText={(text) => setUserRestaurar(text)}
          ></TextInput>
        </View>
        <View style={styles.escudo}>
          <Image
            style={styles.imgRestau}
            source={require("./img/opacity-rerstaurar-mnemonic.png")}
          ></Image>
        </View>
        <View style={styles.cajabtnRest}>
          <TouchableOpacity
            style={styles.btnDone}
            activeOpacity={0.5}
            onPress={() => continuar()}
          >
            <Text style={styles.txtDone}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Restaurar;
