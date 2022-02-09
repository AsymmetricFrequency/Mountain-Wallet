import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Appearance
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { readMnemonic } from "../../api";
//Fuente
import * as Font from "expo-font";
import { styles } from "../theme/appTheme";
import {
  scrollInterpolator,
  animatedStyles,
} from "../screens/utils/animations";
import Carousel from "react-native-snap-carousel";
import { appendFile } from "fs/promises";
import { useTheme } from 'react-native-paper';

const SLIDER_WIDTH = Dimensions.get("screen").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);
const altura = Platform.OS === "ios" ? 22 : 25;

const elements: string[] = [];

function leerMnemonic() {
  
  const mnemonic = readMnemonic();
  mnemonic.then((value) => {
    const docePalabras = value;
    const words = docePalabras.split(" ");
    for (let index = 0; index < 12; index++) {
      elements.push(words[index]);
    }
  });
}

const Crearcuenta = ({ navigation }: { navigation: any }) => {
  
  //Detecta el modo del sistema
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
  const { colors } = useTheme();

  const [numero, setNumero] = useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const Palabras = () =>{
    setRefreshing(true);
      leerMnemonic() 
    setTimeout(() => {
      setRefreshing(false);
    }, 5);
    }
    
  const RenderItem =  ({ item }) => {
      return (
        <View style={styles.itemContainer}>
          <Text style={[styles.itemLabel,{color:colors.text}]}>{`${item}`}</Text>
        </View>
      );
  };

  return (
    <SafeAreaView style={[styles.body,{backgroundColor:colors.background}]}>
      <StatusBar 
        backgroundColor= {colors.background}
        barStyle={theme === 'dark' ?  "light-content" : "dark-content"} 
      />
      <SafeAreaView>
        <ScrollView
          style={{ backgroundColor: "red" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor="#5b298a"
              colors={["#5b298a", "#7e54a7"]}
            />
          }
        ></ScrollView>
      </SafeAreaView> 
      <View style={styles.cajacc}>
        <View style={styles.titlecc}>
          <Text style={[styles.titletx,{color:colors.text}]}>Crear nueva cartera</Text>
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
          <Text style={[styles.txttx,{color:colors.accent}]}>
            Escribe tu frase de respaldo en un lugar seguro
          </Text>
        </View>
        <TouchableOpacity
              style={[styles.btnDone,{ backgroundColor:colors.text}]}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("DocePalabras")}
            >
              <Text style={[styles.txtDone,{color:colors.background}]}>Crear 12 palabras</Text>
            </TouchableOpacity>
        <Carousel
          data={elements}
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
          <Text style={[styles.counter,{color:colors.text}]}>{numero} de 12</Text>
        </View>
        {numero == 12 && (
          <View style={styles.cajabtn}>
            <TouchableOpacity
              style={[styles.btnDone,{ backgroundColor:colors.text}]}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("DocePalabras")}
            >
              <Text style={[styles.txtDone,{color:colors.background}]}>Continuar</Text>
            </TouchableOpacity>
          </View>
        )}
      
      </View>
    </SafeAreaView>
  );
};

export default Crearcuenta;
