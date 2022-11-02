import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import BottomSheet from "../components/BottomSheet";

export default function SelectTrajet() {

  const membresMatch = [
    { name: "Medhi", communStations: 5, starRate: 3.5 },
    { name: "Beubeu31", communStations: 3, starRate: 4.9 },
    { name: "Ali", communStations: 2, starRate: 0.2 },
    { name: "Chloé", communStations: 1, starRate: 4.8 },
    { name: "Medhi", communStations: 5, starRate: 3.5 },
    { name: "Beubeu31", communStations: 3, starRate: 4.9 },
    { name: "Ali", communStations: 2, starRate: 0.2 },
    { name: "Chloé", communStations: 1, starRate: 4.8 },
    { name: "Medhi", communStations: 5, starRate: 3.5 },
    { name: "Beubeu31", communStations: 3, starRate: 4.9 },
    { name: "Ali", communStations: 2, starRate: 0.2 },
    { name: "Chloé", communStations: 1, starRate: 4.8 },

  ];
  const mapMembresMatch = membresMatch.map((data, i) => {
    return (
      <View key={i} style={styles.mapStyle}>
        <View style={styles.avatarPic}>
            <FontAwesome name={'user'} color={'white'} size={15}/>
        </View>
        <Text>{data.name}</Text>
        <Text>{data.communStations} stations en commun</Text>
        <Text>{data.starRate}</Text>
        <FontAwesome name={'star'} color={'yellow'} size={15}/>
      </View>
    );
  });
  return (
    <View style={styles.globalContainer}>
      <Text>Instructions de voyage:</Text>
      <View style={styles.container1}>
        <Text>Marcher jusqu'à n'en plus pouvoir</Text>
      </View>
      <Text>Membres sur votre trajet:</Text>
      <View style={styles.container2}>
        <ScrollView>
        {mapMembresMatch}

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    marginTop: 20,
    width: "80%",
    height: "40%",
  },
  container1: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  container2:{
    backgroundColor:'rgba(60, 58, 188, 1)',
  },
  mapStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:30,
    marginLeft:4,
    marginRight:4,
  },
  avatarPic:{
    height:20,
    width:20,
    backgroundColor:'grey',
    borderRadius:9999,
    justifyContent:'center',
    alignItems:'center',
  }
});
