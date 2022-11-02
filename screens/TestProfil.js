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

export default function TestProfilScreen() {
  // const user = useSelector((state) => state.user.value);
  const url = useSelector((state) => state.url.value);
  const token = useSelector((state) => state.users.value.token);
  console.log("Token-->", token);
  const [profilInfos, setProfilInfos] = useState([]);
  const [firstnameM, setFirstnameM] = useState(false);
  const [lastnameM, setLastnameM] = useState(false);
  const [emailM, setEmailM] = useState(false);
  const [birthDayDateM, setBirthDayDateM] = useState(false);
  const [sexeM, setSexeM] = useState(false);
  const [usernameM, setUsernameM] = useState(false);
  const [edit, setEdit] = useState(false);

  console.log("ProfilInfos --> ", profilInfos);
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
    console.log('click');
    sendedInfo = { token: token };
    sendedInfo[fieldUpdated] = valueUpdated;
    fetch(`http://${url}:3000/users/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({firstname : firstnameM}),
    })
      .then((profilInfo) => profilInfo.json())
      .then((profilInfo) => {


        if (profilInfo) {
          console.log("edit fait");
          // console.log(profilInfo);
          setEdit(false);
          // console.log('Modification faites avec succès')
        }
      });
    // userName: profilInfo.userName, firstName: profilInfo.firstName, sexe: profilInfo.sexe,
    // email: profilInfo.email, phoneNumber: profilInfo.phoneNumber, address: profilInfo.address,
    // favoriteTransportLine: profilInfo.favoriteTransportLine, profilPhoto: profilInfo.profilPhoto,
    // showProfilPhoto: profilInfo.showProfilPhoto, showSexOnProfil: profilInfo.showSexOnProfil,
    // registerDate: profilInfo.registerDate, emergencyTime: profilInfo.emergencyTime, score: profilInfo.score
  };
  console.log("Edit -->", edit);
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/imageProfil.png")}
      />
      <View style={styles.MainInfoContainer}>
        <View style={styles.editSaveButtons}>
          {!edit && (
            <Text onPress={() => setEdit(true)}>
              <FontAwesome name="edit"></FontAwesome> Modifier

            </Text>
          )}
          {edit && (
            <Text onPress={() => validateProfilInfo()}>
              <FontAwesome name="check-circle"></FontAwesome> Enregistrer
            </Text>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Prénom :</Text>
          {!edit && <Text style={styles.text2}>{profilInfos.firstname} </Text>}
          {edit && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstnameM(value )}
                value={firstnameM}
                style={styles.input}
              />

              {/*<FontAwesome style ={styles.editingProfil} name='remove' onPress={() => setFirstNameM(true)} size={25} color='#ec6e5b' />*/}
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text1}>Nom :</Text>
          {!lastnameM && (
            <Text style={styles.text2}>
              {profilInfos.lastname}{" "}
              <FontAwesome
                style={styles.editProfil}
                name="edit"
                onPress={() => setLastnameM(true)}
                size={25}
                color="#ec6e5b"
              />
            </Text>
          )}
          {lastnameM && (
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Nom"
                onChangeText={(value) => setProfilInfos({ lastname: value })}
                value={profilInfos.lastname}
                style={styles.input}
              />
              <FontAwesome
                style={styles.editingProfil}
                name="check-circle"
                onPress={() =>
                  validateProfilInfo("lastname", profilInfos.lastName)
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgba(	124, 96, 183, 0.4)",
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
    height: "60%",
    width: "80%",

    marginTop: "15%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  editSaveButtons: {
    width: 100,
    marginTop: 10,
    marginLeft: 20,
    alignItems: "center",
    backgroundColor: "#ec6e5b",
    borderRadius: 25,
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

  text1: {
    fontSize: 15,
    width: "100%",
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
    alignItems: "stretch",
  },

  editProfil: {
    textAlign: "right",
  },
  editingProfil: {
    textAlign: "right",
  },
});
