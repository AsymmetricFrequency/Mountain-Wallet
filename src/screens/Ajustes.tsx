import { View, Text, StatusBar, Image, ScrollView, Platform, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";


const altura = Platform.OS === "ios" ? 22 : 25;



const Ajustes = () => {

  // Concatenar pkey
  var str = '8XkS7ZDPR9zXcNcYR884tBScnQRyFcWRb7WcLtCR6zEZ';
  var strFirstThree = str.substring(0,5);
  var strLastThree = str.substring(str.length-5,str.length);
  var concatenado = `${strFirstThree}...${strLastThree}`

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <View style={styles.body}>
      <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
      <View style={styles.completo}>
        <View style={styles.titlecc}>
          <Text style={styles.titletx}>Configuración</Text>
        </View>
        <Image
          style={styles.logosintxt}
          source={require("./img/mountain-enviar.png")}
        />
        <ScrollView horizontal={false}>

          <View style={styles.cajaaj}>
            <View style={styles.useraj}>
              <View style={styles.btnaj}>
                <Icon name="user-circle" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtuaj}>
              <Text style={styles.contaj}>Usuario condor</Text>
              <Text style={styles.contuaj}>{concatenado}</Text>
            </View>
            <TouchableOpacity style={styles.editaj} activeOpacity={0.5}>
              <View>
                <Icons name="pencil" size={altura} color="#E2DBEE" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cajaaj}>
            <View style={styles.imgaj}>
              <Switch
                style={styles.switchMode}
                trackColor={{ false: "#E2DBEE", true: "#522E7C" }}
                thumbColor={isEnabled ? "#00FFFF" : "#440577"}
                ios_backgroundColor="#E2DBEE"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <TouchableOpacity style={styles.txtaj} activeOpacity={0.5} onPress={toggleSwitch}>
              <Text style={styles.contaj}>Apariencia</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.cajaaj} activeOpacity={0.5}>
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icon name="arrow-down" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={styles.contaj}>Exportar frase de respaldo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cajaaj} activeOpacity={0.5}>
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icons name="cellphone-key" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={styles.contaj}>Exportar llave privada</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cajaaj} activeOpacity={0.5}>
            <View style={styles.imgaj}>
              <View style={styles.btnaj}>
                <Icons name="logout" size={altura} color="#440577" />
              </View>
            </View>
            <View style={styles.txtaj}>
              <Text style={styles.contaj}>Cerrar Sesion</Text>
            </View>
          </TouchableOpacity>
          
       
        </ScrollView>

        
      </View>
    </View>
  );
};

export default Ajustes;
function useColorMode(): { colorMode: any; toggleColorMode: any; } {
  throw new Error('Function not implemented.');
}

