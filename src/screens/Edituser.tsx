import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Platform, Appearance } from 'react-native';
import React, { useState } from 'react';
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';

const altura = Platform.OS === "ios" ? 22 : 25;


const Edituser = ({ navigation }: { navigation: any }) => {
  //Detecta el modo del sistema
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={[styles.body,{backgroundColor:colors.background}]}>
        <StatusBar 
          backgroundColor= {colors.background}
          barStyle={theme === 'dark' ?  "light-content" : "dark-content"} 
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={[styles.completo,{backgroundColor:colors.background}]}
          scrollEnabled={false}
        >
            <View style={styles.titlecc}>
            <Text style={[styles.titlex,{left:20,color:colors.text}]}>Cambiar nombre de usuario</Text>
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
            <View style={[styles.cajauser,{borderColor:colors.text}]}>
              <TextInput style={[styles.inputuser,{color:colors.text}]} autoFocus={true}>
                
              </TextInput>
            </View>
            <View style={styles.cajabtneuser}>
              <TouchableOpacity
                style={[styles.btnDone,{ backgroundColor:colors.text}]}
                activeOpacity={0.5}
              >
                <Text style={[styles.txtDone,{color:colors.background}]}>Continuar</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Edituser;
