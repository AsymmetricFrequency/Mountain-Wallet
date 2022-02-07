import { View, Text, SafeAreaView, Appearance } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../theme/appTheme';
import { useTheme } from 'react-native-paper';


const Swap = () => {
  //Detecta el modo del sistema
  const [theme,setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  })
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.body,{backgroundColor:colors.background,alignItems: "center",justifyContent: "center"}]}>
      <Text style={{color:colors.text}}>Soy Swap</Text>
    </SafeAreaView>
  );
};

export default Swap;
