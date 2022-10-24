import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
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
        <Text style ={styles.text1}>Prénom :</Text>
        <Text style ={styles.text2}>{profilInfos.firstName}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Nom :</Text>
        <Text style ={styles.text2}>{profilInfos.lastName}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Email :</Text>
        <Text style ={styles.text2}>{profilInfos.email}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Date de Naissance :</Text>
        <Text style ={styles.text2}>{profilInfos.birthdayDate}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Sexe :</Text>
        <Text style ={styles.text2}>{profilInfos.sexe}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Ligne Préférée :</Text>
        <Text style ={styles.text2}>{profilInfos.favoriteTransportLine}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Voyager avec des personnes du même sexe :</Text>
        <Text style ={styles.text2}>{profilInfos.travelingWithSameSex}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Afficher mon sexe sur le profil :</Text>
        <Text style ={styles.text2}>{profilInfos.showSexOnProfil}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Date d'enregistrement :</Text>
        <Text style ={styles.text2}>{profilInfos.registerDate}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Délai avant notification d'urgence :</Text>
        <Text style ={styles.text2}>{profilInfos.emergencyTime}</Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Note :</Text>
        <Text style ={styles.text2}>{profilInfos.score}</Text>
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
    marginTop: 100,
    height:100,
    width: 100,
    borderRadius: 20
  },
  MainInfoContainer: {
    height: "68%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space",
    marginTop: "15%",
    backgroundColor: "white",
    borderRadius: 20
  },

  infoContainer: {
    // height: 30,
    width: "100%",
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "rgba(	124, 96, 183, 0.1)",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18
  },

  text1:{
    fontSize: 15,
  },

  text2:{
    color: "#478bbc",
    fontSize: 15
  },
})