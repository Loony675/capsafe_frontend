import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ImageBackground, Image, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, ParamListBase } from "@react-navigation/native";


export default function HomeScreen({ navigation }) {

  
  return (
      <View style = {styles.background}>
        <Image style = {styles.logo} source={{uri : "https://res.cloudinary.com/dpe2tab7h/image/upload/v1666616816/LOGO_CAPSAFE_2_aclnue.jpg"}}/>
        <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.btn1}>
            <Image style={styles.image1} source={require("../assets/facebook.png")} />
            <Text style = {styles.facebook}>S’enregistrer avec Facebook </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn2}>
            <Image style={styles.image1} source={require("../assets/google.png")} />
            <Text style = {styles.google}>S’enregistrer avec Google </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn3} onPress={() => navigation.navigate('SignUp')}>
            <Text style = {styles.signUp}>S’enregistrer par email</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn4}>
            <Text style = {styles.signIn} onPress={() => navigation.navigate('SignIn')}>Déjà un compte ?</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}


const styles = StyleSheet.create({
  background: {
    flex: "1",    
    backgroundColor: "rgba(	124, 96, 183, 0.4)",
    alignItems: "center",
    justifyContent : "center",
  },
  logo: {
    marginTop: "10%",
    height:100,
    width: 100,
    borderRadius:9999
  },
  buttonContainer: {
    height: "40%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
 
  },
  btn1: {
    flex: "row",
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: "20%",   
    justifyContent: 'center',
    marginBottom: 15,
    alignSelf: 'center'
   },
   image1: { 
    marginTop: 11,
    marginLeft: 10,   
    width: 30,
    height: 30
   },
  facebook: {   
    textAlign:'center',
    fontFamily: "Montserrat", 
    fontSize: 20
     
  },
  btn2: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: 'center',
    marginBottom: 15
  },
  image2: { 
    marginTop: 12,
    marginLeft: 10,   
    width: 30,
    height: 30
  },
  google: {
    textAlign:'center',   
    fontSize: 20 
  },
  btn3: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: "rgba(71, 139, 188, 0.4)",
  },
  signUp: {
    textAlign:'center',
    color: 'white',
    fontSize: 20
  },
  btn4: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: "rgba(71, 139, 188, 0.4)",
  },
  signIn: {
    textAlign:'center',
    color: 'white',
    fontSize: 20

  },
})