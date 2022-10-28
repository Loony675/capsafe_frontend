import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import BottomSheet from "../components/BottomSheet";

export default function Adresses() {
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <Text> Enregistrer une nouvelle adresse</Text>
        <View style={styles.addAddress} >
          <TextInput placeholder=""></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    width: "80%",
    justifyContent: "center",
  },
  container1: {

  },
  addAddress:{
    flexDirection:"row",
    height:40,
    borderWidth:2,
  }
});
