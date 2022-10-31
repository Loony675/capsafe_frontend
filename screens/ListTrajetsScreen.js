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
import {
  isVisibleListTraj,
  isVisibleDeparture,
  isVisibleSelectTraj,
} from "../reducers/isVisible";

export default function ListTrajet() {
  const listTrajet = [
    { logo: "0", nbrMembre: "11  membres sur votre trajet", timer: "23 min" },
    { logo: "1", nbrMembre: "7 membres sur votre trajet", timer: "10 min" },
    { logo: "2", nbrMembre: "4 membres sur votre trajet", timer: "111 min" },
  ];

  const dispatch = useDispatch();
  const goToSelectTrajet = () => {
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: false }));
    dispatch(isVisibleSelectTraj({isVisibleSelectTrajet : true}))

  }
  const mapListAddress = listTrajet.map((data, i) => {
    return (
      <View key={i} style={styles.mapStyle}>
        <View style={styles.mapDirection}>
          <TouchableOpacity
            onPress={() =>
              goToSelectTrajet()
            }
          >
            <Text>{data.logo}</Text>
            <Text style={{ fontWeight: "600" }}>{data.nbrMembre}</Text>
            <Text>{data.timer}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  /* retour DepartureArrival*/

  const backToDA = () => {
    dispatch(isVisibleListTraj({ isVisibleListTrajet: false }));
    dispatch(isVisibleDeparture({ isVisibleDA: true }));
  };
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => backToDA()}>
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
          <Text>56 boulevard Pereire, 75017 Paris</Text>
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

          <Text>41 Rue de Pet Unia, 75017 Paris</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <Text style={{ color: "white", fontWeight: "600", fontSize: "15" }}>
          Suggérés
        </Text>
      </View>
      <View style={styles.container4}>{mapListAddress}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop: -10,
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
    marginBottom: 10,
    width: "80%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
  pin: {
    marginLeft: 10,
  },
  container3: {
    marginBottom: 10,
    fontWeight: "600",
  },
  container4: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    height: "60%",
  },
  mapStyle: {
    flexDirection:'row',
  },
  mapDirection: {
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "grey",
  },
});
