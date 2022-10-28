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
  const listAddress = [
    { name: "Starbuck", address: "26 avenue de l'Opéra, 75001 Paris France " },
    { name: "Martine", address: "26 avenue de l'Opéra, 75001 Paris France " },
    {
      name: "Papi Mamie",
      address: "26 avenue de l'Opéra, 75001 Paris France ",
    },
  ];
  const mapListAddress = listAddress.map((data, i) => {
    console.log(data);
    return (
      <View key={i} style={styles.mapStyle}>
        <FontAwesome
          name={"map-marker"}
          size={25}
          color={"rgba(71, 139, 188, 1)"}
          style={styles.pin}
        />
        <View style={styles.mapDirection}>
          <Text>{data.name}</Text>
          <Text>{data.address}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <Text> Enregistrer une nouvelle adresse</Text>
        <View style={styles.addAddress}>
          <TextInput placeholder=""></TextInput>
        </View>
      </View>
      <View style={styles.container2}>
        <Text> Liste des adresses</Text>
        <View style={styles.listAddress}>{mapListAddress}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    width: "80%",
    justifyContent: "center",
  },
  container1: {},
  addAddress: {
    flexDirection: "row",
    height: 40,
    borderWidth: 2,
    backgroundColor: "white",
  },
  container2: {},
  listAddress: {
    flexDirection: "column",
  },
  mapStyle: {
    flexDirection:'row',
    height: 80,
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom:10,

  },
  mapDirection:{
    borderWidth:2,
  }
});
