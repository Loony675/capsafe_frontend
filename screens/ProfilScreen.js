import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RollInRight } from "react-native-reanimated";

const ProfilScreen = () => {
  // const user = useSelector((state) => state.user.value);
  const url = useSelector((state) => state.url.value);
  const token = useSelector((state) => state.users.value.token);
  console.log("Token-->", token);
  const [profilInfos, setProfilInfos] = useState([]);
  const [firstNameM, setFirstNameM] = useState(false);
  const [lastNameM, setLastNameM] = useState(false);
  const [emailM, setEmailM] = useState(false);
  const [birthDayDateM, setBirthDayDateM] = useState(false);
  const [sexeM, setSexeM] = useState(false);
  const [usernameM, setUsernameM] = useState(false);

    console.log('ProfilInfos --> ',profilInfos);
    console.log('FirstName --> ',profilInfos.firstName);
  // updateProfilInfo('lastName')
  let sendedInfo;
  useEffect(() => {
    fetch(`http://${url}:3000/users/displayOneUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    })
      .then((profilInfo) => profilInfo.json())
      .then((profilInfo) => {
        if (profilInfo.result) {
          setProfilInfos(profilInfo.userInfo);
        }
      });
    // userName: profilInfo.userName, firstName: profilInfo.firstName, sexe: profilInfo.sexe,
    // email: profilInfo.email, phoneNumber: profilInfo.phoneNumber, address: profilInfo.address,
    // favoriteTransportLine: profilInfo.favoriteTransportLine, profilPhoto: profilInfo.profilPhoto,
    // showProfilPhoto: profilInfo.showProfilPhoto, showSexOnProfil: profilInfo.showSexOnProfil,
    // registerDate: profilInfo.registerDate, emergencyTime: profilInfo.emergencyTime, score: profilInfo.score
  }, [sendedInfo]);

  const selectField = (fieldSelected) => {
    // setProfilInfos[fieldSelected]()
  };

  const validateProfilInfo = (fieldUpdated, valueUpdated) => {
    sendedInfo = { token: token };
    sendedInfo[fieldUpdated] = valueUpdated;
    fetch(`http://${url}:3000/users/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendedInfo),
    })
      .then((profilInfo) => profilInfo.json())
      .then((profilInfo) => {
        if (profilInfo.result) {
          console.log('edit fait');
          // console.log(profilInfo);
          setFirstNameM(false);
          setLastNameM(false);
          setEmailM(false);
          setBirthDayDateM(false);
          setSexeM(false);
          // console.log('Modification faites avec succès')
        }
      });
    // userName: profilInfo.userName, firstName: profilInfo.firstName, sexe: profilInfo.sexe,
    // email: profilInfo.email, phoneNumber: profilInfo.phoneNumber, address: profilInfo.address,
    // favoriteTransportLine: profilInfo.favoriteTransportLine, profilPhoto: profilInfo.profilPhoto,
    // showProfilPhoto: profilInfo.showProfilPhoto, showSexOnProfil: profilInfo.showSexOnProfil,
    // registerDate: profilInfo.registerDate, emergencyTime: profilInfo.emergencyTime, score: profilInfo.score
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/imageProfil.png")}
      />
      <View style={styles.MainInfoContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Prénom :</Text>
          {!firstNameM && (
            <Text style={styles.text2}>
              {profilInfos.firstName}{" test"}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setFirstNameM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {firstNameM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstNameM(value) }
                value={profilInfos.firstName}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() =>
                  validateProfilInfo("firstName", profilInfos.firstName)
                }
                size={25}
                color="#ec6e5b"
              />
              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Nom :</Text>
          {!lastNameM && (
            <Text style={styles.text2}>
              {profilInfos.lastName}{" "}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setLastNameM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {lastNameM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Nom"
                onChangeText={(value) => setProfilInfos({ lastName: value })}
                value={profilInfos.lastName}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() =>
                  validateProfilInfo("lastName", profilInfos.lastName)
                }
                size={25}
                color="#ec6e5b"
              />
              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Username :</Text>
          {!usernameM && (
            <Text style={styles.text2}>
              {profilInfos.username}{" "}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setUsernameM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {usernameM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Username"
                onChangeText={(value) => setProfilInfos({ username: value })}
                value={profilInfos.username}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() =>
                  validateProfilInfo("username", profilInfos.username)
                }
                size={25}
                color="#ec6e5b"
              />
              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Email :</Text>
          {!emailM && (
            <Text style={styles.text2}>
              {profilInfos.email}{" "}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setEmailM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {emailM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Email"
                onChangeText={(value) => setProfilInfos({ email: value })}
                value={profilInfos.email}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() => validateProfilInfo("email", profilInfos.email)}
                size={25}
                color="#ec6e5b"
              />
              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Date de naissance :</Text>

          {!birthDayDateM && (
            <Text style={styles.text2}>
              {profilInfos.birthDayDate}{" "}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setbirthDayDateM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {birthDayDateM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Prénom"
                onChangeText={(value) =>
                  setProfilInfos({ birthDayDate: value })
                }
                value={profilInfos.birthDayDate}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() =>
                  validateProfilInfo("birthDayDate", profilInfos.birthDayDate)
                }
                size={25}
                color="#ec6e5b"
              />
              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Sexe :</Text>
          {!sexeM && (
            <Text style={styles.text2}>
              {profilInfos.sexe}{" "}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setSexeM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {sexeM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Sexe"
                onChangeText={(value) => setProfilInfos({ sexe: value })}
                value={profilInfos.sexe}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() => validateProfilInfo("sexe", profilInfos.sexe)}
                size={25}
                color="#ec6e5b"
              />
              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        {/* <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Ligne Préférée :</Text>
        <Text style ={styles.text2}>{profilInfos.favoriteTransportLine} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => setFavoriteTransportLineM(true)} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Voyager avec des personnes du même sexe :</Text>
        <Text style ={styles.text2}>{profilInfos.travelingWithSameSex} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('travelingWithSameSex')} size={25} color='#ec6e5b' /></Text>
      </View>
      <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Afficher mon sexe sur le profil :</Text>
        <Text style ={styles.text2}>{profilInfos.showSexOnProfil} <FontAwesome style ={styles.editProfil} name='edit' onPress={() => updateProfilInfo('showSexOnProfil')} size={25} color='#ec6e5b' /></Text>
      </View> */}
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Date d'enregistrement :</Text>
          <Text style={styles.text2}>{profilInfos.registerDate} </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Délai avant notification d'urgence :</Text>
          <Text style={styles.text2}>
            {profilInfos.emergencyTime}{" "}
            <FontAwesome
              style={styles.editProfil}
              name="edit"
              onPress={() => updateProfilInfo("emergencyTime")}
              size={25}
              color="#ec6e5b"
            />
          </Text>
        </View>
        {/* <View style ={styles.infoContainer}>
        <Text style ={styles.text1}>Note :</Text>
        <Text style ={styles.text2}>{profilInfos.score}</Text>
      </View> */}
      </View>
    </View>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgba(71, 139, 188, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 100,
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  MainInfoContainer: {
    height: "68%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "10%",
    backgroundColor: "#f4a261",
    borderRadius: 20,
  },

  infoContainer: {
      width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 20,
    fontSize: 18,
    borderRadius: 10,
    paddingLeft: 10
  },

  text1:{
    fontSize: 15,
    width: '100%',
  },

  text2: {
    color: "#478bbc",
    fontSize: 15,
    width: "100%",
  },

  editContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },

  editProfil: {
    textAlign: "right",
  },

  editingProfil: {
    textAlign: "right",
  },
// test

cadre: {
  width: "90%",
  height: "7%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "white",
  borderRadius: 10,
  paddingLeft: 10,
},

left:{
  height: "100%",
  borderWidth: 1,
},
  prenom:{
    height: "50%",
  },

  test2:{
    color: "#478bbc",
    fontSize: 15,
    borderWidth: 1,

  },
  
  crayon:{
  },

  editContainer1:{
    flexDirection:'row' ,
    flexWrap: 'wrap',
    width:'50%',
    alignItems:'stretch',
    borderWidth: 1,

  },

  input1: {
    borderWidth: 1,

  },
  
  editingProfil1:{
    borderWidth: 1,

  },
})
