import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput, KeyboardAvoidingView
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/users";

export default function SignUpScreen({navigation}) {
  const [emailSignUp, setEmailSignUp] = useState();
  const [usernameSignUp, setUsernameSignUp] = useState();
  const [passwordSignUp, setPasswordSignUp] = useState();
  const url = useSelector((state) => state.url.value);

  const dispatch = useDispatch();

  const handleRegister = () => {

    // fetch(`http://${url}:3000/users/signUp`, { // local
    fetch('https://capsafe-backend.vercel.app/users/signUp', { // vercel
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
        console.log(data);
        if (data.result) {
          dispatch(login({ username: usernameSignUp, token: data.token }));
          navigation.navigate('TabNavigator', { screen: 'Main' });
        }
      });
  };

  return (
    // <KeyboardAvoidingView style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    <View style={styles.background}>
        <Image style = {styles.logo} source={{uri : "https://res.cloudinary.com/dpe2tab7h/image/upload/v1667468073/LOGO_CapSafe_V4_-_OMBRE_zolwhe.jpg"}}/>
      <View style={styles.container}>
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
          autoCapitalize="none"
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
        <TouchableOpacity style={styles.btnSignUp} onPress={() => handleRegister()}>
          <Text style={styles.fieldBtnSignUp}>Rejoindre Capsafe</Text>
        </TouchableOpacity>
      </View>
    </View>
  // </KeyboardAvoidingView>
  );
}

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
    justifyContent: "center",
    marginTop: "5%",
  },

  input: {
    flexDirection: "row",
    width: "100%",
    height: "15%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 15,
    alignSelf: "center",
    padding: 15,
  },

  btnSignUp: {
    flexDirection: "row",
    width: "75%",
    height: "15%",
    backgroundColor: "#f4a261",
    borderWidth: 1,
    borderRadius: 30,
    alignItems:'center',
    justifyContent: "center",
    marginTop: 25,
  },
  fieldBtnSignUp: {
    textAlign: "center",
    alignItems:'center',
    color: "white",
    fontWeight: "600",
    fontSize: 20
  },
});
