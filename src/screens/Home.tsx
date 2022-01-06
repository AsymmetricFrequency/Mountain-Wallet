import React, { useEffect, useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image, Linking, Platform, Dimensions } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from 'react-native-animatable';
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
        alignItems:'center',
        paddingLeft: RFValue(15),
        paddingRight: RFValue(paddinrightios),
        paddingTop: RFValue(35),
    },
    fondo:{
        height: windowHeight,
        margin:0,
        resizeMode: 'contain',
        width: windowWidth,
    },
    logo:{
        height: windowHeight*0.2,
        resizeMode: 'contain',
        width: windowWidth*0.5,
    },
    botonesCI:{
        backgroundColor:'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: windowHeight*0.8,
        justifyContent: 'center',
        marginTop: RFValue(15),
        padding: RFValue(10),
        width: '100%',
    },
    botones:{
        height: windowHeight*0.8,
        paddingTop: windowHeight*0.3
    },
    btnC:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 20,
        elevation:24,
        marginLeft: RFValue(30),
        marginRight: RFValue(30),
        paddingTop: RFValue(12),
        paddingBottom: RFValue(12),
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    btnI:{
        alignItems:'center',
        backgroundColor:'#5b298a',
        borderRadius: 20,
        elevation:24,
        marginTop: RFValue(18),
        marginRight: RFValue(30),
        marginLeft: RFValue(30),
        paddingBottom: RFValue(12),
        paddingTop: RFValue(12), 
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textCI:{
        color:'white',
        fontSize:RFValue(11.5),
        fontWeight: 'bold',
    },
    Developed:{
        alignItems: 'center',
        bottom: bottomdevelopios,
        left: 0, 
        justifyContent: 'center',
        paddingTop: 0,
        position: 'absolute', 
        right: 0,
    },
    textDeveloped:{
        color:'#e0e0e0',
        fontSize:RFValue(8),
        fontFamily: 'opensans-regular',
        fontWeight:'bold',
    },
    //Boton pagina
    Developed2:{
        marginLeft:RFValue(-220)
    },
    fab: {
        backgroundColor: '#5b298a',  
        borderRadius:50,
        height: 60,
        justifyContent: 'center',
        width: 60,
    },
    miniLogo: {
        alignSelf: 'center',
        resizeMode: 'contain',
         width: windowWidth*0.12,
    },
})
export default Home