import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image,
  Appearance,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "react-native-paper";

const altura = Platform.OS === "ios" ? 22 : 25;

const Exclave = ({ navigation, route }: { navigation: any; route: any }) => {
  const secretKey = route.params?.llave_privada;

  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  const [cambio, setCambio] = useState(false);

  const mostrar = () => {
    setCambio(true);
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titlex}>Exportar clave privada</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Exclave;
