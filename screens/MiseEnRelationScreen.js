import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function MiseEnRelation() {
  const avis = [
    { avatar: "0", com: "Plûtot marrant avec sa moustache" },
    { avatar: "1", com: "Agréable et souriant" },
    { avatar: "2", com: "Gentil et discret" },
  ];
  const mapAvis = avis.map((data, i) => {
    return (
      <View key={i}>
        <Text>
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
          <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
            Envoyer un message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
            Téléphoner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
            Rejoindre
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{ color: "white", fontSize: 25, fontWeight: "600" }}>
            Signaler/bloquer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    backgroundColor: "rgba(	124, 96, 183, 1)",
    height: "100%",
    flex: 1,
  },
  container1: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 40,
    fontWeight: "800",
    color: "white",
  },
  rate: {
    color: "white",
    fontSize: 20,
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
    marginLeft: 20,
    alignItems: "flex-start",
  },
  container3: {
    flex: 2,
    alignItems: "center",
  },
  buttons: {
    height: 30,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "rgba(71, 139, 188, 1)",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    borderColor: "black",
    borderWidth: 1,
  },
});
