import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { styles } from '../theme/appTheme'
import { LotieInternet } from "./component/lottie";

const SinInternet = () => {
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar
        backgroundColor={'#FBF7FF'}
        barStyle={"dark-content"}
      />
      <View style={[styles.completo, styles.internet]}>
        <LotieInternet/>
        <View>
            <Text style={styles.txtconectar} numberOfLines= {3}>
            No se puede conectar a una red local.
            </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SinInternet