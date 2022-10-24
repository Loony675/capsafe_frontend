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

const SignInScreen = ({ navigation }) => {
  // Regex Email
  const EMAIL_REGEX =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // Etats
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleConnection = () => {
    if(!EMAIL_REGEX.test(signInEmail)) {
      setEmailError(true);
    }
    fetch("http://192.168.10.181:3000/users/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          navigation.navigate("TabNavigator", { screen: "Main" });
          setSignInEmail("");
          setSignInPassword("");
        } 
      });
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.emailInput}
          onChangeText={(value) => setSignInEmail(value)}
          value={signInEmail}
          placeholder="Email"
        />
        {emailError && <Text style={styles.error}>Adresse email invalide</Text>}
        <TextInput
          style={styles.passwordInput}
          onChangeText={(value) => setSignInPassword(value)}
          type="password"
          value={signInPassword}
          placeholder="Mot de passe"
          textContentType={"password"}
        />
        <TouchableOpacity style={styles.btn1}>
          <Text style={styles.connection} onPress={() => handleConnection()}>
            Se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.mdp}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(	124, 96, 183, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    marginTop: "10%",
    height: "40%",
    width: "60%",
  },

  container: {
    marginTop: "80%",
    height: "40%",
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
    paddingLeft: 15,
  },

  error: {
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
    marginTop: 15,
    marginBottom: 60,
    paddingLeft: 15,
  },

  btn1: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 30,
  },
  connection: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },

  btn2: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 15,
  },
  mdp: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
