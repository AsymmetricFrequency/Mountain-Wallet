import {
    Image,
    Platform,
    StatusBar,
    Text,
    TextInput,
    View,
    Clipboard,
    ToastAndroid,
    Alert,
    Appearance,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import Icon from "react-native-vector-icons/MaterialCommunityIcons";
  import { styles } from "../theme/appTheme";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Lotiesucces, LotiesuccesDark } from "./component/lottie";
  import LottieView from "lottie-react-native";
  import { Colors } from "react-native/Libraries/NewAppScreen";
  import { useTheme } from "react-native-paper";
  
  const altura = Platform.OS === "ios" ? 22 : 25;
  
  const TranExitosa = ({
    navigation,
    route,
  }: {
    navigation: any;
    route: any;
  }) => {
    //Detecta el modo del sistema
    const [theme, setTheme] = useState(Appearance.getColorScheme());
    Appearance.addChangeListener((scheme) => {
      setTheme(scheme.colorScheme);
    });
    const { colors } = useTheme();
    const [copiedText, setCopiedText] = useState("");
    const [animacion, setAnimacion] = useState(false);
    const CopyToClipboard = () => {
      Clipboard.setString("hola mundo");
      setAnimacion(true);
      if (Platform.OS === "android") {
        ToastAndroid.show("Identificador copiado", ToastAndroid.SHORT);
      } else {
        Alert.alert("Identificador copiado");
      }
    };
  
    //Animacion copiado
    const animation = React.useRef(null);
    const amj = (number = 0) => {
      if (Platform.OS === "android") {
        number = 2000;
      } else if (Platform.OS === "ios") {
        number = 3000;
      }
      return number;
    };
  
    React.useEffect(() => {
      if (animacion === true) {
        animation.current.play(0, 50);
        setTimeout(() => {
          setAnimacion(false);
        }, amj());
      } else if (animacion === false) {
        if (Platform.OS === "android") {
          animation.current.play(18, 18);
        } else if (Platform.OS === "ios") {
          animation.current.play(18, 50);
        }
      }
    }, [animacion]);
  
    return (
        <SafeAreaView style={[styles.body,{backgroundColor:colors.background}]}>
            <StatusBar 
            backgroundColor= {colors.background}
            barStyle={theme === 'dark' ?  "light-content" : "dark-content"} 
            />
            <View style={[styles.completo,{backgroundColor:colors.background}]}>        
                <View style={styles.titlecc}>
                    <Text style={[styles.titletx, { color: colors.text }]}>
                    Transacción Exitosa
                    </Text>
                </View>
                <View style={styles.cajaatras}>
                    <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.btndo}
                    onPress={() => navigation.goBack()}
                    >
                    <Icon name="close-thick" size={altura} color="#440577" />
                    </TouchableOpacity>
                </View>
    
                <ScrollView 
                contentContainerStyle= {styles.scroll}
                horizontal={false}
                showsVerticalScrollIndicator={false}>
                  
                
                  <View style={styles.cajalotie}>
                    { theme === "light" ?
                      <Lotiesucces />
                      : 
                      <LotiesuccesDark/>
                    } 
                  </View>
                  <View style={styles.textInputE}>
                      <View>
                        <Text style={styles.icntt}>Cantidad</Text>
                      </View>                    
                      <View style={styles.txtingresa }>
                          <Text style={[styles.transa, { color: colors.placeholder }]}>0</Text>
                      </View>
                      <View style={styles.contcnd}>
                        <Text style={[styles.cndrRx, { color: colors.placeholder }]}>CNDR</Text>
                    </View>
                  </View>
                
                  <View style={styles.contid}>
                      <Text style={styles.txtid}>Identificador de la transacción</Text>
                  </View>
                  <View style={styles.idtransaccion}>
                      <TouchableOpacity
                      onPress={() => CopyToClipboard()}
                      activeOpacity={0.5}
                      >
                          <View style={styles.tablaid}>
                              <View style={styles.cbtncid}>
                                  <LottieView
                                      ref={animation}
                                      style={styles.lottiecopy}
                                      source={require("../screens/Lottie/copy.json")}
                                      autoPlay={false}
                                      loop={false}
                                  />
                              </View>
                              <View style={styles.cuadroid}>
                                  <Text numberOfLines={4} style={styles.txtqid}>
                                      8XkS7ZDPR9zXcNcYR884tBScnQRyFcWRb7WcLtCR6zEZnQRyFc
                                  </Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.cajatermi}>
                    <TouchableOpacity
                      style={[styles.btnterminar,{ backgroundColor:colors.text}]}
                      activeOpacity={0.5}     
                    >
                      <Text style={[styles.txtterminar,{color:colors.background}]}>Terminar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.cnttransa,{ borderColor: colors.placeholder}]}>
                      <TouchableOpacity style={styles.btntransa}>
                      <Text style={styles.txttransa}>Ir a la transacción</Text>
                      </TouchableOpacity>
                  </View>
                </ScrollView>
            </View>
      </SafeAreaView>
    );
  };
  
  export default TranExitosa;
  