import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  Appearance,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { styles } from "../theme/appTheme";
import {
  scrollInterpolator,
  animatedStyles,
} from "../screens/utils/animations";
import Carousel from "react-native-snap-carousel";
import { useTheme } from "react-native-paper";

const SLIDER_WIDTH = Dimensions.get("screen").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const altura = Platform.OS === "ios" ? 22 : 25;

const Crearcuenta = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const frase = route.params?.msg.split(" ");
  //const palabras = frase.split(" ")

  //Detecta el modo del sistema
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    setTheme(scheme.colorScheme);
  });
  const { colors } = useTheme();

  const [numero, setNumero] = useState(1);

  const RenderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`${item}`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.cajacc}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Crear nueva cartera</Text>
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
        <View style={styles.txtcc}>
          <Text style={styles.txttx}>
            Escribe tu frase de respaldo en un lugar seguro
          </Text>
        </View>
        <Carousel
          data={frase}
          activeSlideAlignment={"center"}
          renderItem={RenderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={145}
          slideStyle={styles.carusel}
          // inactiveSlideShift={10}
          inactiveSlideOpacity={0.1}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
          onSnapToItem={(index) => setNumero(index + 1)}
          enableMomentum={true}
        />
        <View style={styles.txtpag}>
          <Text style={styles.counter}>{numero} de 12</Text>
        </View>
        {numero == 12 && (
          <View style={styles.cajabtn}>
            <TouchableOpacity
              style={styles.btnDone}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("DocePalabras")}
            >
              <Text style={styles.txtDone}>Continuar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Crearcuenta;
