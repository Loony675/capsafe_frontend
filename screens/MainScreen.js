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
import BottomSheet from '../components/BottomSheet';
import OnVaOuScreen from "./OnVaOuScreen";

export default function MainScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);

  // Demande accord géolocation
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("Status", status);
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          // console.log("Location--->", location);
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      
      <MapView style={styles.map}>
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title="My position"
            pinColor="#fecb2d"
          />
        )}
      </MapView>
      <BottomSheet/>

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