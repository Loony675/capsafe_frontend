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