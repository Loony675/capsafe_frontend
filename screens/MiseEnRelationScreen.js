import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';


export default function MiseEnRelationScreen({navigation}) {

  // const navigation = useNavigation()
  const avis = [
    { avatar: "0", com: "Plûtot marrant avec sa moustache" },
    { avatar: "1", com: "Agréable et souriant" },
    { avatar: "2", com: "Gentil et discret" },
  ];
  const mapAvis = avis.map((data, i) => {
    return (
      <View key={i}>
        <Text style={styles.avis}>
          {data.avatar} {data.com}
        </Text>
      </View>
    );
  });
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <Text style={styles.username}>Beubeu31</Text>
        <Text style={styles.rate}>
          4.9 <FontAwesome name="star" color="orange" size="30"></FontAwesome>
        </Text>
        <Text style={styles.memberSince}>Membre depuis le 18/09/2022</Text>
        <View style={styles.borderBottom}></View>
      </View>
      <View style={styles.container2}>
        {mapAvis}
        <View style={styles.borderBottom}></View>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.buttons}>
          <Text style= {styles.textBtn} onPress= {() => navigation.navigate('TabNavigator', { screen: 'ChatTest' })}>
            Envoyer un message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textBtn}>
            Téléphoner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textBtn}>
            Rejoindre
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.textBtn}>
            Signaler/bloquer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('TabNavigator')}>
          <Text style={styles.textBtn}>
            BACK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,    
    backgroundColor: "rgba(71, 139, 188, 1)",
  },

  container1: {
    alignItems: "center",
    justifyContent: "center",
    height: "25%",
  },

  username: {
    fontSize: 40,
    fontWeight: "800",
    color: "white",
    marginTop: 40
  },

  rate: {
    color: "white",
    fontSize: 25,
    marginBottom: 10,
  },

  memberSince: {
    color: "white",
    fontSize: 15,
    marginBottom: 5,
  },

  borderBottom: {
    width: "80%",
    borderBottomWidth: 5,
    borderBottomColor: "rgba(71, 139, 188, 1)",
    alignItems: "center",
    justifyContent: "center",
  },

  container2: {
    alignItems: "flex-start",
    borderWidth: 1,
    height: "20%",
    paddingLeft: 15,
    color: 'white'
  },

  avis: {
    color: 'white'
  },

  container3: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "55%",
  },

  buttons: {
    backgroundColor: "#f4a261",
    width: "75%",
    height: "12%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    
  },

  textBtn: {
    fontWeight: "600",
    fontSize: 20,
    color: 'white'
  },

  buttonBack:{
    height:70,
    width:70,
    backgroundColor:'#f4a261',
    borderRadius:9999,
    alignItems:'center',
    justifyContent:'center'
  }
});
