import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

const ProfilScreen = () => {
  // const user = useSelector((state) => state.user.value);

  const [profilInfos, setProfilInfos] = useState([])

useEffect(() => {
  fetch('http://192.168.10.163:3000/users/displayProfil', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: 'b6AWk7AnQIgDGmEg3WfXMfc62nTSL978'}),
  }).then(profilInfo => profilInfo.json()).then(profilInfo => {
      if(profilInfo.result){
        setProfilInfos(profilInfo.userInfo)
        console.log(profilInfos)
      }
    }
  )
  // userName: profilInfo.userName, firstName: profilInfo.firstName, sexe: profilInfo.sexe, 
  // email: profilInfo.email, phoneNumber: profilInfo.phoneNumber, address: profilInfo.address, 
  // favoriteTransportLine: profilInfo.favoriteTransportLine, profilPhoto: profilInfo.profilPhoto, 
  // showProfilPhoto: profilInfo.showProfilPhoto, showSexOnProfil: profilInfo.showSexOnProfil, 
  // registerDate: profilInfo.registerDate, emergencyTime: profilInfo.emergencyTime, score: profilInfo.score
}, [])

  
  return (
  <View style = {styles.mainContainer}>
    <Image style = {styles.logo} source={require("../assets/imageProfil.png")}/>
    <View style = {styles.MainInfoContainer}>


  <View style ={styles.infoContainer}>
    <Text>Prénom:</Text>
    <Text>{profilInfos.firstName}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Nom:</Text>
    <Text>{profilInfos.lastName}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Email:</Text>
    <Text>{profilInfos.email}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Date de Naissance:</Text>
    <Text>{profilInfos.birthdayDate}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Sexe:</Text>
    <Text>{profilInfos.sexe}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Ligne Préférée:</Text>
    <Text>{profilInfos.favoriteTransportLine}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Voyager avec des personnes du même sexe:</Text>
    <Text>{profilInfos.travelingWithSameSex}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Afficher mon sexe sur le profil:</Text>
    <Text>{profilInfos.showSexOnProfil}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Date d'enregistrement:</Text>
    <Text>{profilInfos.registerDate}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Délai avant notification d'urgence:</Text>
    <Text>{profilInfos.emergencyTime}</Text>
  </View>
  <View style ={styles.infoContainer}>
    <Text>Note:</Text>
    <Text>{profilInfos.score}</Text>
  </View>
  </View>
  </View>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,    
    backgroundColor: "rgba(	124, 96, 183, 0.4)",
    alignItems: "center",
    justifyContent : "center",
  },
  logo: {
    marginTop: 10,
    height:100,
    width: 100,
    borderRadius:9999
  },
  MainInfoContainer: {
    height: "70%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    backgroundColor: "rgba(	124, 96, 183, 0.1)",
  },
  infoContainer: {
    // height: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(	124, 96, 183, 0.1)",
  },
})