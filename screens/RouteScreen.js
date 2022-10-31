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
  return setTrajet([...trajet,reponseAPIJson.journeys[0]])
}
)

  }, [])
  //  !trajet? <Text style = {styles.departure}> recherche en cours</Text> : 
 let affichage =  trajet.map((data, i)=>{
  console.log(data.sections[i].type );
    if(data.sections[i].type !== 'waiting'){
      console.log("hy !!!!");
  return  <Text style = {styles.departure}> De: {data.sections[i].from.name}  jusqu'à:{data.sections[i].to.name}</Text>}
   }

 )


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