import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BottomSheet from "../components/BottomSheet";

export default function DepartureArrival() {
  return (

      <View style={styles.globalContainer}>
        <View style={styles.container1}>
          <TouchableOpacity>
            <View>
              <FontAwesome name={"arrow-left"} size={20} color={"grey"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDepart}>
            <Text>Départ</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonArrivee}>
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
    borderRadius: 25,
    justifyContent: "center",
  },
  container1: {
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "blue",
  },
  buttonDepart: {
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom: 20,
    width: "100%",
  },
  buttonArrivee: {
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "white",
    marginBottom: 20,
    width: "100%",
  },
});
