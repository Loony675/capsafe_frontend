import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const SignInScreen = () => {

  const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const [signInEmail, setSignInEmail] = useState('');
const [password, setPassword] = useState('');

const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(updateEmail(email));
      navigation.navigate("TabNavigator", { screen: "Gallery" });
    } else {
      setEmailError(true);
    }
  };

  return (
    <View style = {styles.background}>
        <View style = {styles.container}>
          <TextInput style = {styles.emailInput} onChangeText={(value) => setEmail(value)} value={email} placeholder='Email'/>
          <TextInput style = {styles.passwordInput} onChangeText={(value) => setPassword(value)} type="password" 
           value={password} placeholder='Mot de passe' textContentType={'password'}/>                
          <TouchableOpacity style = {styles.btn1}>
            <Text style = {styles.connection}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn2}>
            <Text style = {styles.mdp}>Mot de passe oublié ?</Text>
          </TouchableOpacity>          
        </View>
      </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  background: {
    flex: "1",    
    backgroundColor: "rgba(	124, 96, 183, 0.4)",
    alignItems: "center",
    justifyContent : "center",
  },

  logo: {
    marginTop: "10%",
    height:"40%",
    width: "60%"
  },

  container: {
    marginTop: "80%",
    height:"40%",
    width: "75%",
  },

  emailInput: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",    
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 30,
    paddingLeft: 15
  },

  passwordInput: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",    
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 60,
    paddingLeft: 15
   },

   btn1: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: 'center',
    marginBottom: 30
  },
  connection: {   
    textAlign:'center',
    fontFamily: "montserrat", 
    fontSize: 20     
  },
  btn2: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: 'center',
    marginBottom: 15
  },  
  mdp: {   
    textAlign:'center',
    fontFamily: "montserrat", 
    fontSize: 20     
  }, 
})