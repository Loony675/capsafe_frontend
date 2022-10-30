import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect,useState } from 'react';
import * as Location from "expo-location";
//update

const RouteScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [trajet, setTrajet] = useState([]);

  useEffect(() => {
        const options = {
          headers: {
            Authorization: "a3241d36-8169-4f8b-840c-214b769f3771"
          }
        };
 fetch(`https://api.navitia.io/v1/journeys?from=2.3036095;48.8877713&to=2.655400;48.542107`, options).then(
  retourAPI => retourAPI.json().then(
    retourAPI => {   
      setTrajet(retourAPI)
      console.log(trajet);
  }))}, []);
  return (
    <View style={styles.container}>
        {trajet ==! undefined && <View style = {styles.left}>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[0].from.name} {trajet.journeys[0].sections[0].mode}jusqu'à:{trajet.journeys[0].sections[0].to.name}</Text>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[1].from.name} {trajet.journeys[0].sections[1].mode}jusqu'à:{trajet.journeys[0].sections[1].to.name}</Text>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[2].from.name} {trajet.journeys[0].sections[2].mode}jusqu'à:{trajet.journeys[0].sections[3].to.name}</Text>
              {/* <Text style = {styles.departure}>De:{trajet.journeys[0].sections[3].from.name} {trajet.journeys[0].sections[3].mode}jusqu'à:{trajet.journeys[0].sections[3].to.name}</Text>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[4].from.name} {trajet.journeys[0].sections[4].mode}jusqu'à:{trajet.journeys[0].sections[4].to.name}</Text>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[5].from.name} {trajet.journeys[0].sections[5].mode}jusqu'à:{trajet.journeys[0].sections[5].to.name}</Text>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[6].from.name} {trajet.journeys[0].sections[6].mode}jusqu'à:{trajet.journeys[0].sections[6].to.name}</Text>
              <Text style = {styles.departure}>De:{trajet.journeys[0].sections[7].from.name} {trajet.journeys[0].sections[7].mode}jusqu'à:{trajet.journeys[0].sections[7].to.name}</Text> */}


            </View>}
    </View>
  )
}

export default RouteScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(124, 96, 183, 0.7)',
    alignItems: "center",
},
left: {
  marginLeft: 20,
  height: '100%',
},
})