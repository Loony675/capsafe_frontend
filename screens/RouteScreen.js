import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect,useState } from 'react';
import * as Location from "expo-location";
//update

const RouteScreen = () => {
  var affichage
  const [currentPosition, setCurrentPosition] = useState(null);
  const [trajet, setTrajet] = useState(null);

  useEffect(() => {
    async function reponseAPI() {
      const options = {
        headers: {
          Authorization: "a3241d36-8169-4f8b-840c-214b769f3771"
        }
      };
let reponseAPI = await fetch(`https://api.navitia.io/v1/journeys?from=2.3036095;48.8877713&to=2.655400;48.542107`, options)
let reponseAPIJson = await reponseAPI.json()
return reponseAPIJson

}
reponseAPI().then(reponseAPIJson => {
  console.log(reponseAPIJson.journeys[0]);
  return setTrajet(reponseAPIJson.journeys[0])
}
)

  }, [])
  affichage = (
   !trajet? <Text style = {styles.departure}> recherche en cours</Text> : 
   trajet.map((data, i)=>{
    if(data){<Text style = {styles.departure}> De: {data.sections[i].from.name} {/* {trajet.sections[0].mode}  */}
    jusqu'à:{data.sections[i].to.name}
    </Text>}
   }

   )
)

console.log(trajet);

  return (
  <View style={styles.container}>
       
      <View style = {styles.left}>
{affichage}
 </View>
  </View>
)}

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
  width: '100%',
  alignItems:'center',
  justifyContent:'center',
},
departure:{
  borderWidth: 3,
  borderColor: 'red',
  backgroundColor: 'white',
}
})