import {
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
  Clipboard,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { styles } from "../theme/appTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const altura = Platform.OS === "ios" ? 22 : 25;

const EnviarDireccion = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [copiedText, setCopiedText] = useState("");

  const { pinN } = route.params;
  const { abrev } = route.params;
  const { msg, mon } = route.params;
  const { titleMoneda } = route.params;

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
          {/* <AutoSizeText
            numberOfLines={1}
            mode={ResizeTextMode.group}
            style={styles.txtAjust}
          >
            <Text style={styles.cntdRecibe}>{pinN}</Text>
          </AutoSizeText> */}
          <View style={styles.txtAjustables}>
            <TextInput
              style={styles.cantidadRecibe}
              editable={false}
              placeholder="0"
            >
              {pinN}
            </TextInput>
          </View>
        </View>
        <View style={styles.contCndr}>
          <Text style={styles.cndrR}>{abrev}</Text>
          <Text style={styles.valorR}>$ 0.00</Text>
        </View>
        <View style={styles.pegarDireccion}>
          <View style={{ width: "55%" }}>
            <TextInput style={styles.pegaDir} placeholder="Pegar dirección">
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

        <View style={styles.btnEnviar}>
          <TouchableOpacity style={styles.btnCont}>
            <Text style={styles.txtEnviar}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EnviarDireccion;
