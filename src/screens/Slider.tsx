// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, { useState } from 'react';

import { styles } from '../theme/appTheme';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';


//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';

const Slider = ({navigation}: {navigation: any}) => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
 
  };

  const onSkip = () => {
    setShowRealApp(true);
  };

  const RenderItem = ({ item }) => {
    return (
      <View style={[{backgroundColor: item.backgroundColor},styles.sli]}>
        <Image style={styles.introImageStyle} source={item.image} />
        <View style={styles.cajatitle}>
            <Text style={styles.introTitleStyle}>{item.title}</Text>
        </View>
        <View style={styles.cajatxt}>
            <Text style={styles.introTextStyle}>{item.text}</Text>
        </View>
        {
            item.key == 's3' && (
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.btnDone} activeOpacity={0.5} onPress={() => navigation.navigate('Crear')}>
                        <Text style={styles.txtDone}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            )
        }
      </View>
    );
  };
   

    return (
    <>
      {showRealApp ? (
        <View></View>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          showNextButton ={false}
          showDoneButton ={false}
          dotStyle={styles.dotst}
          activeDotStyle={styles.actist}
                                                  
        />
      )}
    </>
    );

  
};

export default Slider;



const slides = [
  {
    key: 's1',
    title: 'La frase de recuperación es un respaldo para tu cartera',
    text: 'Podrás iniciar sesión con tu contraseña, pero necesitarás tu frase de recuperación para acceder',
    image: require("../screens/img/backup.png") ,
    backgroundColor: '#FBF7FF',
  },
  {
    key: 's2',
    title: 'Escribe tu frase de respaldo',
    text: 'Es de vital importancia que escribas y guardes la frase de recuperación para tu cartera en un lugar seguro',
    image: require("../screens/img/pencil.png"),
    backgroundColor: '#FBF7FF',
  },
  {
    key: 's3',
    title: 'Evita compartir tu frase de respaldo.',
    text: 'Recuerda que es personal e intrasferible',
    image: require("../screens/img/seguridad.png"),
    backgroundColor: '#FBF7FF',
  },
 
];
