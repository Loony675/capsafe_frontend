import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect,useState } from 'react';
import * as Location from "expo-location";
//update

const RouteScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
       Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          fetch(`https://api.navitia.io/v1/journeys?from=${currentPosition.longitude};${currentPosition.latitude}&to=2.655400;48.542107?key=a3241d36-8169-4f8b-840c-214b769f3771`).then(
  retourAPI => retourAPI.json().then(
    retourAPI => {
      console.log(retourAPI)}))
        });
      }
    })();
  }, []);
  
  console.log('current position', currentPosition)
  useEffect(() => {
    (async () => { 
await (currentPosition)
      if(currentPosition){
fetch(`https://api.navitia.io/v1/journeys?from=${currentPosition.longitude};${currentPosition.latitude}&to=2.655400;48.542107?key=a3241d36-8169-4f8b-840c-214b769f3771`).then(
  retourAPI => retourAPI.json().then(
    retourAPI => {
      console.log(retourAPI.journey[0].sections[0].from.name)
  }))}})}
)
  return (
    <View>

    </View>
  )
}

export default RouteScreen

const styles = StyleSheet.create({})