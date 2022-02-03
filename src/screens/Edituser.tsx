import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { styles } from "../theme/appTheme";
import Icon from "react-native-vector-icons/FontAwesome5";

const altura = Platform.OS === "ios" ? 22 : 25;


const Edituser = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.body}>
        <StatusBar backgroundColor="#FBF7FF" barStyle={"dark-content"} />
        <View style={styles.completo}>
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
        </View>
    </SafeAreaView>
  );
};

export default Edituser;
