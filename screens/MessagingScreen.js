import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//update

const MessagingScreen = ({ navigation }) => {
  const url = useSelector((state) => state.url.value);
  const token = useSelector((state) => state.users.value.token);
  const BACKEND_ADDRESS = `http://${url}:3000`;
  const [myMessages, setMyMessages] = useState([{ token: "" }]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/message/sync`, {//je récupère tous les messages avec le token de lutilisateur qui est connecté
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }), //On veux envoyer le token au back via le req.body
    })
      .then((data) => data.json())
      .then((data) => {
         const newConversation = data.map((data, i) => {
         console.log(data.tokenReceiver);
          if (!data.tokenReceiver === token ) {
            myMessages.push({ token: data.tokenSender });
          } else if(){
            myMessages.push({ token: data.tokenReceiver });

          }
        });
        //console.log(myMessages);
      });
    }, []);
    // 
  const handleclic = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Titre}>Messages</Text>
      <TouchableOpacity
        style={styles.conversation}
        onPress={() => handleclic()}
      >
        <Image style={styles.photo} source={require("../assets/beubeu.jpg")} />
        <View style={styles.left}>
          <Text style={styles.username}>Benoit</Text>
          <Text style={styles.text}>Salut ça va ? ...</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.timestamp}>15h41</Text>
          <TouchableOpacity style={styles.newMessage}></TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MessagingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(124, 96, 183, 0.7)",
    alignItems: "center",
  },

  Titre: {
    fontSize: 40,
    justifyContent: "center",
    marginTop: "20%",
  },

  conversation: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    marginTop: "10%",
  },

  photo: {
    marginLeft: 5,
    height: "70%",
    width: "15%",
  },

  left: {
    marginLeft: 20,
    height: "100%",
  },

  username: {
    fontSize: 25,
    fontWeight: "bold",
  },

  text: {
    marginTop: "10%",
    fontSize: 20,
  },

  right: {
    height: "100%",
    width: "20%",
    fontSize: 20,
    marginLeft: "24%",
    alignItems: "center",
  },

  timestamp: {
    marginTop: "5%",
    fontSize: 20,
  },

  newMessage: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: "rgba(71, 139, 188, 1)",
    shadowColor: "#000",
    marginTop: "10%",
  },
});
