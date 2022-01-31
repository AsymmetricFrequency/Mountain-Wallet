import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";

const altura = Platform.OS === "ios" ? 22 : 25;

const Moneda = ({ navigation }: { navigation: any }) => {

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={styles.completo}>
        <View style={styles.logomoneda}>
          <Image
            style={styles.imgmoneda}
            source={require("./img/billeteras/logocondor.png")}
          />
        </View>
        <View style={styles.cajamon}>
          <View>
            <Text style={styles.montxt}>CONDORCOIN</Text>
          </View>
          <View>
            <Text style={styles.montxt}>(CNDR)</Text>
          </View>
        </View>
        <View style={styles.cajaatras}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btndo}
            onPress={() => navigation.navigate("Barra")}
          >
            <Icon name="arrow-left" size={altura} color="#440577" />
          </TouchableOpacity>
        </View>
        <View style={styles.cajasf}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text numberOfLines={1} style={styles.saldofull}>0</Text>
          </ScrollView>
          
        </View>
        <View style={styles.dcER}>
            <View style={styles.dcE}>
            <TouchableOpacity
              style={[styles.btnR,styles.sombras]}
              activeOpacity={0.5}
              // onPress={() => navigation.navigate("Enviar")}
            >
              <Text style={styles.textbtnR}>Enviar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dcR}>
            <TouchableOpacity
              style={[styles.btnR,styles.sombras]}
              activeOpacity={0.5}
              // onPress={() => navigation.navigate("Recibir")}
            >
              <Text style={styles.textbtnR}>Recibir</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default Moneda;
