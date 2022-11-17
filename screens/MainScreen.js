import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Botton Sheet
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../components/BottomSheet";

export default function MainScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null);

  // Demande accord géolocation
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);
  const pinPositionDeparture = useSelector(
    (state) => state.position.pinDeparture
  );
  const pinPositionArrival = useSelector(
    (state) => state.position.pinArrival
  );
  return (
    <GestureHandlerRootView style={styles.container}>
      <MapView style={styles.map} mapType="hybrid" region={{ latitude: 48.8877, longitude: 2.30368, latitudeDelta:0.02, longitudeDelta: 0.02}}>
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="My position"
            pinColor="#f4a261"
          />
        )}
        {pinPositionDeparture && (
          <Marker
            coordinate={pinPositionDeparture.positionDeparture}
            title="Position départ"
            pinColor="red"
          />
        )}
        {pinPositionArrival && (
          <Marker
            coordinate={pinPositionArrival.positionArrival}
            title="Position arrivée"
            pinColor="blue"
          />
        )}
      </MapView>
      <BottomSheet />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
