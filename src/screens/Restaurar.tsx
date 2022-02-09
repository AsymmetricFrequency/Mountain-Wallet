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
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { saveMmemonic } from "../../api";
import { useTheme } from "react-native-paper";

const altura = Platform.OS === "ios" ? 22 : 25;
//
const Restaurar = ({ navigation }: { navigation: any }) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  const [values, setValues] = useState({
    mnemonic: "",
  });

  //Esta funcion actualiza y toma lo que esta en la caja de texto
  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  const enviarMnemonic = () => {
    fetch("http://10.10.18.13:3000/enviar_mnemonic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mnemonic: values.mnemonic }),
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
  };

  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  function continuar() {
    if (values.mnemonic != "") {
      saveMmemonic(values.mnemonic);
      navigation.navigate("Contraseña");
    } else {
      setVacioModal(true);
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 2000);
    }
  }
  const [copiedText, setCopiedText] = useState("");

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={[
        styles.body,
        { backgroundColor: colors.background },
      ]}
      scrollEnabled={false}
    >
      <StatusBar
        backgroundColor={colors.background}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
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
              onChangeText={(text) => handleChange(text, "mnemonic")}
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
            style={[styles.btnDone, { backgroundColor: colors.text }]}
            activeOpacity={0.5}
            // onPress={() => [continuar(), enviarMnemonic()]}
            onPress={() => navigation.navigate("Contraseña")}
          >
            <Text style={[styles.txtDone, { color: colors.background }]}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Restaurar;
