import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Platform,Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";

const altura = Platform.OS === "ios" ? 22 : 25;


const Exclave = ({ navigation }: { navigation: any }) => {

  const[cambio,setCambio]= useState(false)

  const mostrar = () => {
    setCambio(true)
  }
  

  return (
    <SafeAreaView style={styles.body}>
        <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
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
            <View style={styles.cajaex} >
              { cambio === true ?
                <Text>Solo sé, que no sé nada</Text>
                :
                <Text></Text>
              }
              
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
