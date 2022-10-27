import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../components/BottomSheet";

export default function OnVaOuScreen() {
  const navigation = useNavigation();
  return (
    <BottomSheet>
      <View style={styles.globalContainer}>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.logoOVO}
            onPress={() => navigation.navigate("DepartureArrival")}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("DepartureArrival")}
          >
            <Text> On va où ?</Text>
          </TouchableOpacity>
          <View style={styles.logoVoid}></View>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity style={styles.backgroundLogoHome}>
            <View style={styles.iconHome}>
              <FontAwesome name={"home"} size={30} color={"white"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.textHome}>Rentrer à la maison</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.logoWork}>
              <FontAwesome name={"briefcase"} size={25} color={"white"} />
            </View>
            <Text>Boulot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerAddress}>
            <View style={styles.logoStar}>
              <FontAwesome name={"star"} size={25} color={"white"} />
            </View>
            <Text>Adresses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    height: "40%",
    width: "80%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 25,
  },
  container1: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "50%",
  },
  logoOVO: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 10,
  },
  buttonOVO: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoVoid: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    marginRight: 10,
  },
  container2: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backgroundLogoHome: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    marginLeft: 10,
  },
  iconHome: {
    height: 40,
    width: 40,
    paddingBottom: 4,
    paddingRight: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textHome: {
    fontSize: 12,
  },
  logoWork: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerAddress: {
    alignItems: "center",
    marginRight: 10,
  },
  logoStar: {
    height: 40,
    width: 40,
    backgroundColor: "rgba(71, 139, 188, 1)",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
