import { Appearance, View, Text, StatusBar, Image, ScrollView, Platform, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from 'react-native-paper';

import { readPublicKey, readKey,readUser } from '../../api';



const altura = Platform.OS === "ios" ? 22 : 25;

const Ajustes = ({ navigation, route }: { navigation: any, route: any }) => {

  const [publicKey, setPublicKey] = useState("")
  const [secretKey, setSecretKey] = useState("")
 
  //Variable obtenida de pantalla Edituser 
  var userNew = route.params?.nuevoUsuario
  console.log(userNew);

  //funcion leer nombre de usuario
  const [usuario, setUsuario] = useState("");
      readUser().then((val) => {
      setUsuario(val);
   });


  
  async function setearLlaves() {
    const llavePublica = readPublicKey()
    const llavePrivada = readKey()
    llavePublica.then((value) => {
      setPublicKey(value)
    })
    llavePrivada.then((value) => {
      setSecretKey(value)
    })
  }

  setearLlaves()


  //Detecta el modo del sistema
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
  const { colors } = useTheme();
  // Concatenar pkey
  var str = publicKey;
  var strFirstThree = str.substring(0,5);
  var strLastThree = str.substring(str.length-5,str.length);
  var concatenado = `${strFirstThree}...${strLastThree}`
  
  return (
    <SafeAreaView style={[styles.body,{backgroundColor:colors.background}]}>
      <StatusBar 
        backgroundColor= {colors.background}
        barStyle={theme === 'dark' ?  "light-content" : "dark-content"} 
      />
      <View style={[styles.completo,{backgroundColor:colors.background}]}>
        <View style={styles.titlecc}>
          <Text style={[styles.titletx,{color:colors.text}]}>Configuración</Text>
        </View>
        <Image
          style={styles.logosintxt}
          source={theme === "light" ? require("./img/mountain-enviar.png") : require("./img/mountain-enviarDark.png")}
        />
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>

          <View style={[[styles.cajaaj,{borderTopColor:colors.primary}],{borderTopColor:colors.surface}]}>
            <View style={styles.useraj}>
              <View style={styles.btnaj}>
                <Icon name="user-circle" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtuaj}>
              <Text style={[styles.contaj,{color:colors.text}]}>{userNew !== "" &&(usuario)}{userNew =="" && (userNew)}</Text>
              <Text style={[styles.contuaj,{color:colors.text}]}>{concatenado}</Text>
            </View>
            <TouchableOpacity style={styles.editaj} activeOpacity={0.5} onPress={() => navigation.navigate("Editar")}>
              <View>
                <Icons name="pencil" size={altura} color="#E2DBEE" />
              </View>
            </TouchableOpacity>
        
          </View>
          
          <TouchableOpacity style={[styles.cajaaj,{borderTopColor:colors.surface}]} activeOpacity={0.5} onPress={() => navigation.navigate("ExFrase")} >
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icon name="arrow-down" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={[styles.contaj,{color:colors.text}]}>Exportar frase de respaldo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cajaaj,{borderTopColor:colors.surface}]} activeOpacity={0.5} onPress={() => navigation.navigate("Exclave", {llave_privada:secretKey})}>
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icons name="cellphone-key" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={[styles.contaj,{color:colors.text}]}>Exportar llave privada</Text> 
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cajaaj,{borderTopColor:colors.surface}]} activeOpacity={0.5}>
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icons name="logout" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={[styles.contaj,{color:colors.text}]}>Cerrar Sesion</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Ajustes;


