import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";

export default function SignUpScreen({navigation}) {
  const [emailSignUp, setEmailSignUp] = useState();
  const [usernameSignUp, setUsernameSignUp] = useState();
  const [passwordSignUp, setPasswordSignUp] = useState();

  const dispatch = useDispatch();

  const handleRegister = () => {
    fetch("http://192.168.1.1:3000/users/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailSignUp,
        username: usernameSignUp,
        password: passwordSignUp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: usernameSignUp, token: data.token }));
          navigation.navigate('TabNavigator', { screen: 'Main' });

        }
      });
  };

  return (
    <SafeAreaView style={styles.background}>
        <Image style = {styles.logo} source={{uri : "https://res.cloudinary.com/dpe2tab7h/image/upload/v1666620435/LOGO_CAPSAFE_2_-_1_me7nba.png"}}/>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          autoComplete="email" // https://reactnative.dev/docs/textinput#autocomplete-android
          onChangeText={(value) => setEmailSignUp(value)}
          value={emailSignUp}
        />
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          autoCapitalize="yes"
          onChangeText={(value) => setUsernameSignUp(value)}
          value={usernameSignUp}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(value) => setPasswordSignUp(value)}
          value={passwordSignUp}
        />
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => handleRegister()}
        >
          <Text style={styles.fieldBtnSignUp}>Rejoindre Capsafe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(	124, 96, 183, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: "10%",
    height:300,
    width: 300,
    borderRadius:9999
  },
  inputContainer: {
    height: "40%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  input: {
    flex: "row",
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: "center",
    marginBottom: 15,
    alignSelf: "center",
    padding: 15,
  },
  btnSignUp: {
    flex: "row",
    width: "75%",
    height: "15%",
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderWidth: 1,
    borderRadius: "20%",
    justifyContent: "center",
    marginTop: 25,
    alignSelf: "center",
  },
  fieldBtnSignUp: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});
