import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Appearance,
} from "react-native";

//import AppIntroSlider to use it
import AppIntroSlider from "react-native-app-intro-slider";
import { useTheme } from "react-native-paper";
import { readMnemonic } from "../../api";

const altura = Platform.OS === "ios" ? 22 : 25;

const Slider = ({ navigation, route }: { navigation: any; route: any }) => {
  //Detecta el modo del sistema
  // const [theme, setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme) => {
  //   setTheme(scheme.colorScheme);
  // });
  // const { colors } = useTheme();

  const [mnemonic, setMnemonic] = useState("");

  async function leerMnemonic() {
    const frase = readMnemonic();
    frase.then((value) => {
      setMnemonic(value);
    });
  }

  leerMnemonic();

  const RenderItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.body}>
        <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
        <View style={styles.completo}>
          <Image style={styles.introImageStyle} source={item.image} />
          <View style={styles.cajatitle}>
            <Text style={styles.introTitleStyle}>{item.title}</Text>
          </View>
          <View style={styles.cajatxt}>
            <Text style={styles.introTextStyle}>{item.text}</Text>
          </View>
          {item.key == "s1" && (
            <View style={styles.cajadoneLeft}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btndo}
                onPress={() => navigation.navigate("Home")}
              >
                <Icon name="arrow-left" size={altura} color="#440577" />
              </TouchableOpacity>
            </View>
          )}
          {item.key == "s3" && (
            <View style={styles.cajadone}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btndo}
                onPress={() => navigation.navigate("Crear", { msg: mnemonic })}
              >
                <Icon name="arrow-right" size={altura} color="#440577" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderdone = () => {
    return <></>;
  };

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        showNextButton={false}
        showDoneButton={false}
        renderDoneButton={renderdone}
        dotStyle={styles.dotst}
        activeDotStyle={[styles.actist, { backgroundColor: '#440577' }]}
      />
    </>
  );
};

const slides = [
  {
    key: "s1",
    title: "La frase de recuperación es un respaldo para tu cartera",
    text: "Podrás iniciar sesión con tu contraseña, pero necesitarás tu frase de recuperación para acceder",
    image: require("../screens/img/backup.png"),
  },
  {
    key: "s2",
    title: "Escribe tu frase de respaldo",
    text: "Es de vital importancia que escribas y guardes la frase de recuperación para tu cartera en un lugar seguro",
    image: require("../screens/img/pencil.png"),
  },
  {
    key: "s3",
    title: "Evita compartir tu frase de respaldo.",
    text: "Recuerda que es personal e intrasferible",
    image: require("../screens/img/seguridad.png"),
  },
];

export default Slider;
