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

export default function DepartureArrival() {
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity>
          <View style={styles.arrowLeft}>
            <FontAwesome
              name={"arrow-left"}
              size={20}
              color={"rgb(170,170,170)"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDepart}>
          <Text>Départ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <View style={styles.arrowLeftVoid}>
          <FontAwesome
            name={"arrow-left"}
            size={20}
            color={"rgba(255,255,255,0)"}
          />
        </View>
        <TouchableOpacity style={styles.buttonArrivee}>
          <View style={styles.iconDepart}></View>
          <Text>Arrivée</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    height: "40%",
    width: "80%",
    justifyContent: "center",
  },
  container1: {
    flexDirection: "row",
  },
  arrowLeft: {
    marginRight: 10,
  },
  buttonDepart: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius:10,
    borderWidth:1,
  },
  iconDepart:{
    height:30,
    backgroundColor:'blue',
  },
  container2: {
    flexDirection: "row",
  },
  arrowLeftVoid: {
    marginRight: 10,
  },
  buttonArrivee: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height:40,
    borderRadius:10,
    borderWidth:1,
  },
});
