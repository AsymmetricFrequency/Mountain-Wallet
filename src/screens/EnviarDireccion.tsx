import {
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
  Clipboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../theme/appTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { sendSoles } from "../../api";
import { sendSPL } from "../../api";
import { sendSPLStable } from "../../api";

const altura = Platform.OS === "ios" ? 22 : 25;

const EnviarDireccion = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [copiedText, setCopiedText] = useState("");
  const [toPublic, setToPublic] = useState("");

  const { pinN } = route.params;
  const { abrev } = route.params;
  const { titleMoneda } = route.params;
  const mnemonic = route.params?.memo;
  const mint = route.params?.mint;

  async function enviarSoles() {
    const transaccion = await sendSoles(mnemonic, toPublic, Number(pinN));
    const respuesta = await transaccion;
    navigation.navigate("TranExitosa", { resp: respuesta });
  }

  async function enviarSPL() {
    const transaccion = await sendSPL(mnemonic, toPublic, Number(pinN), mint);
    const respuesta = await transaccion;
    navigation.navigate("TranExitosa", { resp: respuesta });
  }

  async function enviarSPLStable() {
    const transaccion = await sendSPLStable(
      mnemonic,
      toPublic,
      Number(pinN),
      mint
    );
    const respuesta = await transaccion;
    navigation.navigate("TranExitosa", { resp: respuesta });
  }

  const imag = () => {
    if (titleMoneda == "Condorcoin") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/logocondor.png")}
        />
      );
    } else if (titleMoneda == "Solana") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/solana.png")}
        />
      );
    } else if (titleMoneda == "Tether") {
      return (
        <Image
          style={styles.imgmoneda}
          source={require("./img/billeteras/tether.png")}
        />
      );
    }
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  return (
    <KeyboardAwareScrollView style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Enviar {titleMoneda}</Text>
        </View>
        <View style={styles.logorb}>{imag()}</View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>

        <View style={styles.textInput}>
          <Text style={styles.icnt}>Cantidad</Text>
          <View style={styles.txtAjustables}>
            <ScrollView horizontal={true}>
              <Text
                style={styles.cantidadRecibe}
                numberOfLines={1}
                ellipsizeMode="tail"
                minimumFontScale={0.5}
                adjustsFontSizeToFit={true}
                allowFontScaling
              >
                {pinN}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.contCndr}>
          <Text style={styles.cndrR}>{abrev}</Text>
          <Text style={styles.valorR}>$ 0.00</Text>
        </View>
        <View style={styles.pegarDireccion}>
          <View style={{ width: "55%" }}>
            <TextInput
              style={styles.pegaDir}
              onChangeText={(val) => setToPublic(val)}
              placeholder="Pegar dirección"
            >
              {copiedText}
            </TextInput>
          </View>
          <View style={styles.iconos}>
            <TouchableOpacity onPress={() => fetchCopiedText()}>
              <Image
                style={styles.clipboard}
                source={require("./img/Paste-clipboard.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("QrReader")}>
              <Image
                style={styles.qr}
                source={require("./img/qr-enviar.png")}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        {titleMoneda == "Solana" && (
          <View style={styles.btnEnviar}>
            <TouchableOpacity
              style={styles.btnCont}
              onPress={() => [enviarSoles()]}
            >
              <Text style={styles.txtEnviar}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
        {titleMoneda == "Condorcoin" && (
          <View style={styles.btnEnviar}>
            <TouchableOpacity
              style={styles.btnCont}
              onPress={() => [enviarSPL()]}
            >
              <Text style={styles.txtEnviar}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
        {titleMoneda == "Tether" && (
          <View style={styles.btnEnviar}>
            <TouchableOpacity
              style={styles.btnCont}
              onPress={() => [enviarSPLStable()]}
            >
              <Text style={styles.txtEnviar}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EnviarDireccion;
