import {
  View,
  Text,
  Appearance,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Icons from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { styles } from "../theme/appTheme";
import { Lotiefallido } from "./component/lottie";

const altura = Platform.OS === "ios" ? 22 : 25;

const TranFallida = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });

  const respuesta = route.params?.resp;

  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Transacción Fallida</Text>
        </View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.navigate("Balance")}
          >
            <Icon name="close-thick" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <View style={styles.lotti}>
          <Lotiefallido />
        </View>
        <View style={styles.titlemensaje}>
          <Text style={styles.titletxt} numberOfLines={3}>
            Mensaje
          </Text>
        </View>
        <View style={styles.errormensaje}>
          <Text style={styles.errortxt}>{respuesta}</Text>
        </View>
        <View style={styles.cajaterminar}>
          <TouchableOpacity
            style={styles.btnterminar}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Balance")}
          >
            <Text style={styles.txtterminar}>Terminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TranFallida;
