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
import { useDispatch } from "react-redux";
import { isVisibleDeparture, isVisibleListTraj } from "../reducers/isVisible";

export default function DepartureArrival() {
  const dispatch = useDispatch();
  const rechercher =() => {
    dispatch(isVisibleDeparture({isVisibleDA:false}));
    dispatch(isVisibleListTraj({ isVisibleListTrajet: true }))
  }

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() => dispatch(isVisibleDeparture({ isVisibleDA: false }))}
        >
          <View style={styles.arrowLeft}>
            <FontAwesome
              name={"arrow-left"}
              size={20}
              color={"rgb(170,170,170)"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDepart}>
          <FontAwesome
            name={"location-arrow"}
            size={25}
            color={"rgba(71, 139, 188, 1)"}
            style={styles.locationArrow}
          />
          <Text style={styles.textDepart}>Départ</Text>
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
          <FontAwesome
            name={"map-marker"}
            size={25}
            color={"rgba(71, 139, 188, 1)"}
            style={styles.pin}
          />

          <Text style={styles.textArrivee}>Arrivée</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity
          onPress={() =>
            rechercher()
          }
        >
          <Text>Rechercher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop:20,
    height: "40%",
    width: "80%",
    justifyContent: "center",
  },
  container1: {
    flexDirection: "row",
  },
  arrowLeft: {
    marginRight: 10,
    marginTop: 10,
  },
  buttonDepart: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
  locationArrow: {
    marginLeft: 10,
  },
  textDepart: {
    marginLeft: "30%",
  },
  container2: {
    flexDirection: "row",
  },
  arrowLeftVoid: {
    marginRight: 10,
  },
  buttonArrivee: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
  pin: {
    marginLeft: 10,
  },
  textArrivee: {
    marginLeft: "32%",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(10,200,10)",
    height: 40,
    borderRadius: 10,
  },
});
