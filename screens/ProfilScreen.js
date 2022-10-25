import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from 'react-native';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProfilScreen = () => {
  // const user = useSelector((state) => state.user.value);

  const [profilInfos, setProfilInfos] = useState([])
  const [firstNameM, setFirstNameM] = useState(false)

useEffect(() => {
  fetch('http://192.168.10.173:3000/users/displayProfil', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: 'b6AWk7AnQIgDGmEg3WfXMfc62nTSL978', }),
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

const selectField = (fieldSelected) => {
  // setProfilInfos[fieldSelected]()
}

const updateProfilInfo = (fieldUpdated) => {
  let sendedInfo={ token: 'b6AWk7AnQIgDGmEg3WfXMfc62nTSL978'};
  sendedInfo[fieldUpdated] = 'test'
    fetch(`http://192.168.10.173:3000/users/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendedInfo),
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
  }
  
  return (
  <View style = {styles.mainContainer}>
    <Image style = {styles.logo} source={require("../assets/imageProfil.png")}/>
    <View style = {styles.MainInfoContainer}>
      <View style ={styles.infoContainer}>
      {!firstNameM && <Text style ={styles.text1}>Prénom :</Text>}
      {!firstNameM && <Text style ={styles.text2}>{profilInfos.firstName} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' /></Text>}
        {firstNameM && <TextInput placeholder="Prénom" onChangeText={(value) => setProfilInfos.firstName(value)} value={profilInfos.firstName} style={styles.input} />}
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Nom :</Text>
        <Text style ={styles.text2}>{profilInfos.lastName} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('lastName')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Email :</Text>
        <Text style ={styles.text2}>{profilInfos.email} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('email')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Date de Naissance :</Text>
        <Text style ={styles.text2}>{profilInfos.birthdayDate} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('birthdayDate')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Sexe :</Text>
        <Text style ={styles.text2}>{profilInfos.sexe} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('sexe')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Ligne Préférée :</Text>
        <Text style ={styles.text2}>{profilInfos.favoriteTransportLine} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('favoriteTransportLine')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Voyager avec des personnes du même sexe :</Text>
        <Text style ={styles.text2}>{profilInfos.travelingWithSameSex} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('travelingWithSameSex')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Afficher mon sexe sur le profil :</Text>
        <Text style ={styles.text2}>{profilInfos.showSexOnProfil} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('showSexOnProfil')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Date d'enregistrement :</Text>
        <Text style ={styles.text2}>{profilInfos.registerDate} </Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Délai avant notification d'urgence :</Text>
        <Text style ={styles.text2}>{profilInfos.emergencyTime} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('emergencyTime')} size={25} color='#ec6e5b' /></Text>
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
    borderRadius: 20,
  },
  MainInfoContainer: {
    height: "68%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "15%",
    backgroundColor: "white",
    borderRadius: 20,
  },

  infoContainer: {
  //   // height: 30,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "rgba(	124, 96, 183, 0.1)",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
  },

  text1:{
    fontSize: 15,
  },

  text2:{
    color: "#478bbc",
    fontSize: 15,
  },
})