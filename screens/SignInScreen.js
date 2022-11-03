import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";
//update
const SignInScreen = ({ navigation }) => {
  const url = useSelector((state) => state.url.value);
  const dispatch = useDispatch();
  // Regex Email
  const EMAIL_REGEX =
    /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  // Etats
  const [signInEmail, setSignInEmail] = useState("benoit@gmail.com");
  const [signInPassword, setSignInPassword] = useState("1234");
  const [emailError, setEmailError] = useState(false);
  
  const handleConnection = () => {
    if (!EMAIL_REGEX.test(signInEmail)) {
      setEmailError(false);
    }
    fetch(`http://${url}:3000/users/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: data.username, token: data.token }));
          navigation.navigate("TabNavigator", { screen: "Main" });
          setSignInEmail("");
          setSignInPassword("");
        }
      })}  

  return (
    <View style={styles.background}>
      <Image style = {styles.logo} source={{uri : "https://res.cloudinary.com/dpe2tab7h/image/upload/v1666620435/LOGO_CAPSAFE_2_-_1_me7nba.png"}}/>
      <View style={styles.container}>
        <TextInput
          style={styles.emailInput}
          onChangeText={(value) => setSignInEmail(value)}
          value={signInEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
          {emailError && <Text style={styles.errorEmail}>Adresse email invalide</Text>}
        <TextInput
          style={styles.passwordInput}
          onChangeText={(value) => setSignInPassword(value)}
          value={signInPassword}
          placeholder="Mot de passe"
          autoCapitalize="none" // Pas de majuscule
          secureTextEntry={true} // cache le mdp
        />
        <TouchableOpacity style={styles.btnSignIn}>
          <Text style={styles.textSignIn} onPress={() => handleConnection()}>
            Se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPassword}>
          <Text style={styles.textPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}

export default SignInScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(71, 139, 188, 1)",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    marginTop: "10%",
    height:300,
    width: 300,
    borderRadius:9999
  },

  container: {
    height: "40%",
    width: "75%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "5%",
  },

  emailInput: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginTop: 10
  },

  errorEmail: {
    textAlign: "center",
    color: "red",
  },

  passwordInput: {
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
  },

  btnSignIn: {
    width: "75%",
    height: "15%",
    backgroundColor: "#f4a261",
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
  },

  textSignIn: {
    textAlign: "center",
    alignItems:'center',
    color: "white",
    fontWeight: "600",
    fontSize: 20
  },

  btnPassword: {
    width: "75%",
    height: "15%",
    backgroundColor: "#f4a261",
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
  },

  textPassword: {
    textAlign: "center",
    alignItems:'center',
    color: "white",
    fontWeight: "600",
    fontSize: 20
  },
})