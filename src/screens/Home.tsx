import React, { useEffect, useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert, Linking,Platform,Dimensions } from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import { TextInput } from 'react-native-element-textinput';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
// Fuente
import * as Font from 'expo-font'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


const Home = ({navigation}: {navigation: any}) => {

    setTimeout(() => {
        navigation.navigate("Home" as any)
    }, 2500);

    //Función fuentes tipograficas

    const[fontsLoaded, setFontsLoaded] = useState(false);

        useEffect(() => {
            if (!fontsLoaded) {
                loadFonts();
            }
        });
    const loadFonts = async () => {
        await Font.loadAsync({

            //Fuente
            'opensans-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),           
        });

        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
    return(<View/>);
    }
    ///

    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/logoblanco.png')}  />
                   
                    <View style={styles.botonesCI}>
                        {/* Botones */}
                        <View style={styles.botones}>
                            <TouchableOpacity style={styles.btnC}  activeOpacity={0.5} onPress={() => navigation.navigate('Crear')}>
                                <Text style={styles.textCI}>CREAR CUENTA</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnI}  activeOpacity={0.5} onPress={() => navigation.navigate('ImportarCuenta')}>
                                <Text style={styles.textCI}>IMPORTAR</Text> 
                            </TouchableOpacity>                            
                        </View>
                        {/* Desarrollado por */}
                        <View style={styles.Developed}>
                            <Text style={styles.textDeveloped}>DEVELOPED BY</Text>
                            <Text style={styles.textDeveloped}>CONDORCOIN</Text>
                        </View> 
                        {/* Boton pagina */}
                        <View style={styles.Developed}>
                            <TouchableOpacity style={styles.Developed2}  onPress={() => Linking.openURL('https://condorcoin.co/')}>                                
                                <Animatable.View style={styles.fab}
                                    animation="tada"
                                    duration={2000}
                                    iterationCount={"infinite"}>
                                    <Image source={require('./img/condorBlanco.png')} style={styles.miniLogo}/>
                                </Animatable.View>
                            </TouchableOpacity>
                        </View>                                       
                    </View>
                </View>             
            </ImageBackground>   
        </View>
    )
}


const paddinrightios = Platform.OS === 'ios' ? 15 : 12;
const bottomdevelopios = Platform.OS === 'ios' ? 80 : 120;

const styles = StyleSheet.create({
    body:{
        height: windowHeight,
        width: windowWidth,
    },
    containeruno:{
        paddingTop: RFValue(35),
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
        alignItems:'center',
    },
    fondo:{
        height: windowHeight,
        width: windowWidth,
        margin:0,
        resizeMode: 'contain',
    },
    logo:{
        resizeMode: 'contain',
        width: windowWidth*0.5,
        height: windowHeight*0.2
    },
    botonesCI:{
        backgroundColor:'white',
        marginTop: RFValue(15),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: RFValue(10),
        height: windowHeight*0.8,
        width: '100%',  
        justifyContent: 'center',
    },
    botones:{
        height: windowHeight*0.8,
        paddingTop: windowHeight*0.3
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: RFValue(30),
        marginLeft: RFValue(30),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        elevation:24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    btnI:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: RFValue(30),
        marginLeft: RFValue(30),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        borderRadius: 20,
        marginTop: RFValue(18),
        elevation:24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFValue(11.5),
    },
    Developed:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: bottomdevelopios,
        paddingTop: 0
    },
    textDeveloped:{
        color:'#e0e0e0',
        fontWeight:'bold',
        fontSize:RFValue(8),
        fontFamily: 'opensans-regular'
    },
    //Boton pagina
    Developed2:{
        marginLeft:RFValue(-220)
    },
    fab: {
        backgroundColor: '#5b298a',  
        width: 60,
        height: 60,
        borderRadius:50,
        justifyContent: 'center'
    },
    miniLogo: {
        width: windowWidth*0.12,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
})
export default Home