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
import { LotieEnviado, Lotierror } from "./component/lottie";

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
  const [MostrarError, setError] = useState("");

  //Modaleserror
  const [anmt1, setanmt1] = useState("");
  const [vacioModal1, setVacioModal1] = useState(false);
  const [MostrarError1, setError1] = useState("");

  const [copiedText, setCopiedText] = useState("");
  const [toPublic, setToPublic] = useState("");

  //Variables importadas de otras pantallas
  const { pinN } = route.params;
  const { abrev } = route.params;
  const { titleMoneda } = route.params;
  const mnemonic = route.params?.memo;
  const mint = route.params?.mint;
  const text2 = route.params?.text;

  // Variable para bloquear textInpunt enviarDireccion 

  const [bloqueoText , setBloqueoText] = useState (true)

  //Funcion enviar SOL
  async function enviarSoles() {

    if (toPublic == "") {
      setVacioModal1(true);
      setError1("Porfavor ingrese una dirección válida.");
      setanmt1("fadeInDownBig");
      setTimeout(() => {
        setanmt1("fadeOutUp");
        setTimeout(() => {
          setVacioModal1(false);
        }, 100);
      }, 1850); 
    }
    else{
      setVacioModal(true);
      setanmt("zoomIn");
        
      const transaccion = await sendSoles(mnemonic, toPublic, Number(pinN));
      console.log(transaccion);
      
      var respuesta_es = "";
      var spaceCount = transaccion.split(" ").length - 1;
      //Handleo de errores
      if (spaceCount > 0) {
      
        if (
          transaccion ==
          "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
        ) {
          respuesta_es = "Balance insuficiente para esta Transacción";
          setanmt("zoomOut");
          setVacioModal(false);        
          navigation.navigate("TranFallida", { resp: respuesta_es }); 
        
        }else if (transaccion == "Invalid public key input") {
            respuesta_es = "Llave pública de destino invalida";
            setanmt("zoomOut");
            setVacioModal(false);
            navigation.navigate("TranFallida", { resp: respuesta_es }); 

        }else if (transaccion == "Non-base58 character") {
            respuesta_es = "Llave pública de destino invalida";
            setanmt("zoomOut");
            setVacioModal(false);
            navigation.navigate("TranFallida", { resp: respuesta_es });

        } else if (
          transaccion ==
          "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
        ) {
          respuesta_es = "Fondos insuficientes para la Transacción";
          setanmt("zoomOut");
          setVacioModal(false)
          navigation.navigate("TranFallida", { resp: respuesta_es });
        
        } else if (
          transaccion ==
          "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
        ) {
          respuesta_es = "Fondos insuficientes para la Transacción";
          setanmt("zoomOut");
          setVacioModal(false);
          navigation.navigate("TranFallida", { resp: respuesta_es });
        
        }else{
          respuesta_es = "Algo ha salido mal, inténtalo de nuevo";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });
        }
        
      }else {
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranExitosa", { resp: transaccion, num: pinN });
      }
    }
   
  }
  //Funcion enviar CNDR
  async function enviarSPL() {
    if (toPublic == "") {
      setVacioModal1(true);
      setError1("Porfavor ingrese una dirección válida.");
      setanmt1("fadeInDownBig");
      setTimeout(() => {
        setanmt1("fadeOutUp");
        setTimeout(() => {
          setVacioModal1(false);
        }, 100);
      }, 1850); 
    }
    else{
      setVacioModal(true);
    setanmt("zoomIn");
    const transaccion = await sendSPL(mnemonic, toPublic, Number(pinN), mint);
    console.log(transaccion);
    
    var respuesta_es = "";
    var spaceCount = transaccion.split(" ").length - 1;
    //Handleo de errores
    if (spaceCount > 0) {
      
      if (
        transaccion ==
        "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
      ) {
        respuesta_es = "Balance insuficiente para esta Transacción";
        setanmt("zoomOut");
        setVacioModal(false);        
        navigation.navigate("TranFallida", { resp: respuesta_es });
      
      }else if (transaccion == "Failed to find account") {
        respuesta_es = "Balance insuficiente para esta Transacción";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });

      } else if (transaccion == "Invalid public key input") {
        respuesta_es = "Llave pública de destino invalida";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });
      
      }else if (transaccion == "Non-base58 character") {
          respuesta_es = "Llave pública de destino invalida";
          setanmt("zoomOut");
          setVacioModal(false);
          navigation.navigate("TranFallida", { resp: respuesta_es });

      } else if (
        transaccion ==
        "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
      ) {
        respuesta_es = "Fondos insuficientes para la Transacción";
        setanmt("zoomOut");
        setVacioModal(false)
        navigation.navigate("TranFallida", { resp: respuesta_es });
      
      } else if (
        transaccion ==
        "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
      ) {
        respuesta_es = "Fondos insuficientes para la Transacción";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });
      
      }else{
        respuesta_es = "Algo ha salido mal, inténtalo de nuevo";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
      }
      
    }else {
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranExitosa", { resp: transaccion, num: pinN });
    }
  }
  }
  // Funcion enviar TETHER
  async function enviarSPLStable() {
    if (toPublic == "") {
      setVacioModal1(true);
      setError1("Porfavor ingrese una dirección válida.");
      setanmt1("fadeInDownBig");
      setTimeout(() => {
        setanmt1("fadeOutUp");
        setTimeout(() => {
          setVacioModal1(false);
        }, 100);
      }, 1850); 
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
    console.log(transaccion);
    
    var respuesta_es = "";
    var spaceCount = transaccion.split(" ").length - 1;
    
    
   //Handleo de errores
   if (spaceCount > 0) {
      
    if (
      transaccion ==
      "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
    ) {
      respuesta_es = "Balance insuficiente para esta Transacción";
      setanmt("zoomOut");
      setVacioModal(false);        
      navigation.navigate("TranFallida", { resp: respuesta_es });

    }else if (transaccion == "Failed to find account") {
      respuesta_es = "Balance insuficiente para esta Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });

    } else if (transaccion == "Invalid public key input") {
      respuesta_es = "Llave pública de destino invalida";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    
    }else if (transaccion == "Non-base58 character") {
        respuesta_es = "Llave pública de destino invalida";
        setanmt("zoomOut");
        setVacioModal(false);
        navigation.navigate("TranFallida", { resp: respuesta_es });

    } else if (
      transaccion ==
      "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
    ) {
      respuesta_es = "Fondos insuficientes para la Transacción";
      setanmt("zoomOut");
      setVacioModal(false)
      navigation.navigate("TranFallida", { resp: respuesta_es });
    
    } else if (
      transaccion ==
      "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
    ) {
      respuesta_es = "Fondos insuficientes para la Transacción";
      setanmt("zoomOut");
      setVacioModal(false);
      navigation.navigate("TranFallida", { resp: respuesta_es });
    
    }else{
      respuesta_es = "Algo ha salido mal, inténtalo de nuevo";
    setanmt("zoomOut");
    setVacioModal(false);
    navigation.navigate("TranFallida", { resp: respuesta_es });
    }
    
  }else {
    setanmt("zoomOut");
    setVacioModal(false);
    navigation.navigate("TranExitosa", { resp: transaccion, num: pinN });
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
    setBloqueoText(false)
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

      <Modal
        visible={vacioModal1}
        transparent
        onRequestClose={() => setVacioModal1(false)}
        hardwareAccelerated
      >
        <Animatable.View animation={anmt1} duration={600}>
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
                  <Text style={styles.notificacion}>{MostrarError1}</Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
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
              editable = {bloqueoText}
              style={styles.pegaDir}
              onChangeText={(val) => setToPublic(val)}
              placeholder="Pegar dirección"
            > {copiedText}
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
