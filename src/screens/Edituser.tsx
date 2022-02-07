import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const altura = Platform.OS === "ios" ? 22 : 25;


const Edituser = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.body}>
        <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.completo}
          scrollEnabled={false}
        >
            <View style={styles.titlecc}>
            <Text style={[styles.titlex,{left:20}]}>Cambiar nombre de usuario</Text>
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
            <View style={styles.cajauser}>
              <TextInput style={[styles.inputuser]} autoFocus={true}>
                
              </TextInput>
            </View>
            <View style={styles.cajabtneuser}>
              <TouchableOpacity
                style={styles.btnDone}
                activeOpacity={0.5}
              >
                <Text style={styles.txtDone}>Continuar</Text>
              </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Edituser;
