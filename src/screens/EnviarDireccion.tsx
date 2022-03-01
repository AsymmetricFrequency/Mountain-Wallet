import {
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  View,
  Clipboard,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  TapGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../theme/appTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { sendSoles } from "../../api";
import { sendSPL } from "../../api";
import { sendSPLStable } from "../../api";
import * as Animatable from "react-native-animatable";
import { LotieEnviado } from "./component/lottie";

const altura = Platform.OS === "ios" ? 22 : 25;

const EnviarDireccion = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  //Modales
  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  const [copiedText, setCopiedText] = useState("");
  const [toPublic, setToPublic] = useState("");

  const { pinN } = route.params;
  const { abrev } = route.params;
  const { titleMoneda } = route.params;
  const mnemonic = route.params?.memo;
  const mint = route.params?.mint;
  const text2 = route.params?.text;
  
  async function enviarSoles() {

    if (toPublic == "") {
      alert("Porfavor ingrese una direccion valida") 
    }
    else{
      setVacioModal(true);
      setanmt("zoomIn");
        
      const transaccion = await sendSoles(mnemonic, toPublic, Number(pinN));
      const respuesta = await transaccion;
      var respuesta_es = "";
      var spaceCount = respuesta.split(" ").length - 1;
      //Handleo de errores
      if (
        respuesta ==
        "Error: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
      ) {
        respuesta_es = "Balance insuficiente para esta Transacción";
        setanmt("zoomOut");
        setVacioModal(false);        
        navigation.navigate("TranFallida", { resp: respuesta_es });
      } else if (respuesta == "Invalid public key input") {
        respuesta_es = "Llave publica de destino invalida";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });
      } else if (
        respuesta ==
        "Error: failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
      ) {
        respuesta_es = "Fondos insuficientes para la Transacción";
        setanmt("zoomOut");
        setVacioModal(false)
        navigation.navigate("TranFallida", { resp: respuesta_es });
      } else if (
        respuesta ==
        "Error: failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
      ) {
        respuesta_es = "Fondos insuficientes para la Transacción";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });
      } else if (spaceCount > 0) {
        respuesta_es = "Algo ha salido mal, intentalo de nuevo";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });
      } else {
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranExitosa", { resp: respuesta, num: pinN });
      }

    }
   
  }

  async function enviarSPL() {
    if (toPublic == "") {
      alert("Porfavor ingrese una direccion valida") 
    }
    else{
      setVacioModal(true);
    setanmt("zoomIn");
    const transaccion = await sendSPL(mnemonic, toPublic, Number(pinN), mint);
    const respuesta = await transaccion;
    var respuesta_es = "";
    var spaceCount = respuesta.split(" ").length - 1;
    //Handleo de errores
    if (
      respuesta ==
      "Error: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"

    ) {
      respuesta_es = "Balance insuficiente para esta Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (respuesta == "Invalid public key input") {
      respuesta_es = "Llave publica de destino invalida";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (
      respuesta ==
      "Error: failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
    ) {
      respuesta_es = "Fondos insuficientes para la Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (
      respuesta ==
      "Error: failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
    ) {
      respuesta_es = "Fondos insuficientes para la Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (spaceCount > 0) {
      respuesta_es = "Algo ha salido mal, intentalo de nuevo";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else {
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranExitosa", { resp: respuesta, num: pinN });
    }

    }  
  }

  async function enviarSPLStable() {
    if (toPublic == "") {
      alert("Porfavor ingrese una direccion valida") 
    }
   else{
    setVacioModal(true);
    setanmt("zoomIn");
    const transaccion = await sendSPLStable(
      mnemonic,
      toPublic,
      Number(pinN),
      mint
    );
    const respuesta = await transaccion;
    var respuesta_es = "";
    var spaceCount = respuesta.split(" ").length - 1;
    
    //Handleo de errores

    if (
      respuesta ==
      "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
    ) {
      respuesta_es = "Balance insuficiente para esta Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (respuesta == "Invalid public key input") {
      respuesta_es = "Llave publica de destino invalida";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (
      respuesta ==
      "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
    ) {
      respuesta_es = "Fondos insuficientes para la Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (
      respuesta ==
      "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
    ) {
      respuesta_es = "Fondos insuficientes para la Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    } else if (spaceCount > 0) {
      respuesta_es = "Algo ha salido mal, intentalo de nuevo";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    }
     else {
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranExitosa", { resp: respuesta, num: pinN });
      
    }
   }
    
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
    setToPublic(text);
  };

  return (
    <KeyboardAwareScrollView style={styles.body}>
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
        <View style={styles.cajafulldos}>
          <Animatable.View animation={anmt} duration={600}>
            <View style={styles.ventanafull}>
              <View style={styles.icontextfull}>
                <View style={styles.contenedorlottiefull}>
                  <LotieEnviado />
                </View>
              </View>
              <View style={styles.contenedortextfull}>
                <Text style={styles.texticonfull}>
                  Transacción en proceso...
                </Text>
              </View>
            </View>
          </Animatable.View>
        </View>
      </Modal>
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
            {/* <ScrollView horizontal={true}> */}
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
            {/* </ScrollView> */}
          </View>
        </View>
        <View style={styles.contCndr}>
          <Text style={styles.cndrR}>{abrev}</Text>
        </View>
        <View style={styles.pegarDireccion}>
          <View style={{ width: "55%" }}>
            <TextInput
              style={styles.pegaDir}
              onChangeText={(val) => setToPublic(val)}
              placeholder="Pegar dirección"
            > 
           
            </TextInput>
          </View>
          <View style={styles.iconos}>
            <TouchableOpacity onPress={() => fetchCopiedText()}>
              <Image
                style={styles.clipboard}
                source={require("./img/Paste-clipboard.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("QrReader",{
                pinN: pinN,
                titleMoneda: titleMoneda,
                abrev: abrev,
                memo: mnemonic,
                mint: mint,
              })
            }>
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
