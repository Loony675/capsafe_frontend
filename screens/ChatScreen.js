import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import React from "react";
import { useEffect, useState } from "react";
import Pusher from "pusher-js/react-native";

const pusher = new Pusher("9cf6d78d2a5981a0d45c", { cluster: "eu" });

export default function ChatScreenTest({ navigation, route: { params } }) {

  const url = useSelector((state) => state.url.value);
  const BACKEND_ADDRESS = `http://${url}:3000`;

  const username = useSelector((state) => state.users.value.username);
  const token = useSelector((state) => state.users.value.token);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [sended, setSended] = useState(false);
  // console.log(username);
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/message/sync`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      });
  }, []);

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }
    const payload = {
      token1: token,
      token2: "ctK-p1A6zJYEV-fPNAcRVansbEX_eWnO",
      chanel: Math.floor(Math.random() * 100000),
      messageContent: [
        { message: messageText,
          username: username,
          timestamp: new Date(),
          sended: sended
        },
      ],        
    };

    fetch(`${BACKEND_ADDRESS}/message/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSended(!sended);
    setMessageText("");
    this.scrollView.scrollToEnd();
    //update

    fetch(`${BACKEND_ADDRESS}/message/sync`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      });
  };
  const handleReceiveMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/message/Benoit`, { method: "PUT" });

    const subscription = pusher.subscribe("chat");
    subscription.bind("pusher:subscription_succeeded", () => {
      subscription.bind("message", handleReceiveMessage);
    });

    return () => fetch(`${BACKEND_ADDRESS}/message/new`, { method: "DELETE" });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.banner}>
        <MaterialIcons
          name="keyboard-backspace"
          color="#ffffff"
          size={24}
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Messaging" })
          }
        />
        <Text style={styles.greetingText}>Welcome {username} 👋</Text>
      </View>
      <View style={styles.inset}>
        <ScrollView style={styles.scroller} ref={scrollView => this.scrollView = scrollView}>
          {messages.map((message, i) => (
            <View
              key={i}
              style={[
                styles.messageWrapper,
                {
                  ...(message.username === "Hmida"
                    ? styles.messageSent
                    : styles.messageRecieved),
                },
              ]}
            >
              <View
                style={[
                  styles.message,
                  {
                    ...(message.username === "Benoit"
                      ? styles.messageSentBg
                      : styles.messageRecievedBg),
                  },
                ]}
              >
                <Text style={styles.messageText}>{message.message}</Text>
              </View>
              <Text style={styles.timeText}>
                {new Date(message.timestamp).getHours()}:
                {String(new Date(message.timestamp).getMinutes()).padStart(
                  2,
                  "0"
                )}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setMessageText(value)}
            value={messageText}
            style={styles.input}
            autoFocus
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleSendMessage(sended)}
          >
            <MaterialIcons name="send" color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(	124, 96, 183, 0.7)",
  },
  inset: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#ffe099",
    borderLeftColor: "#ffe099",
    borderRightColor: "#ffe099",
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  banner: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  greetingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,        
  },

  messageRecieved: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSent: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(71, 139, 188, 1)",
  },
  messageSentBg: {
    backgroundColor: "rgba(71, 139, 188, 1)",
  },
  messageRecievedBg: {
    backgroundColor: "#d6fff9",
  },
  messageText: {
    color: "#506568",
    fontWeight: "400",
  },
  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  input: {
    backgroundColor: "#f0f0f0",
    width: "80%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "rgba(71, 139, 188, 1)",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import React, { useEffect, useState } from "react";
// import Pusher from "pusher-js/react-native";

// const pusher = new Pusher("9cf6d78d2a5981a0d45c", { cluster: "eu" });
// const BACKEND_ADDRESS = "http://192.168.1.21:3000";

// export default function ChatScreen({ navigation, route: { params } }) {
//   //const user = useSelector((state) => state.user.value.name);
//   const [messages, setMessages] = useState([]); // stockage dans l'état de tus les messages(message , timestamp...)
//   const [messageText, setMessageText] = useState(""); // contenu d'un message

//   useEffect(() => {
//     fetch(`${BACKEND_ADDRESS}/messages/sync`)
//       .then((response) => response.json())
//       .then((data) => {
//         setMessages(data);
//       });
//   }, []);
// // Envoi d'un message dans le chat
//   const handleSendMessage = () => {
//     if (!messageText) { //Si message vide on Stop. Rien ne se passe.
//       return;
//     }
//     const payload = { // contenu du message
//       message: messageText,
//       name: "Benoit",
//       timestamp: new Date(),
//       id: Math.floor(Math.random() * 100000),
//     };
//     fetch(`${BACKEND_ADDRESS}/message/new`, { // On envoi au back
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     setMessageText(""); // On vide le champs de saisie

//   };
// // Réception des messages dans le chat
//   const handleReceiveMessage = (data) => {
//     setMessages((messages) => [...messages, data]); //On conserve l'ancien message et on reçoit le nouveau à la suite
//   };

//   useEffect(() => {
//     fetch(`${BACKEND_ADDRESS}/message/Benoit`, { method: "PUT" });
//     const subscription = pusher.subscribe("chat");
//     subscription.bind("pusher:subscription_succeeded", () => {
//     subscription.bind("message", handleReceiveMessage);
//     });
//   }, []);
//   //return () => fetch(`${BACKEND_ADDRESS}/message/new`, { method: "DELETE" });

//     return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
//       <View style={styles.banner}>
//         <MaterialIcons name="keyboard-backspace" color="#ffffff" size={24} onPress={() => navigation.navigate('Messaging')}/>
//         <Text style={styles.greetingText}>Welcome Benoit 👋</Text>
//       </View>
//       <View style={styles.inset}>
//         <ScrollView style={styles.scroller}>
//           {messages.map((message, i) => (
//             <View key={i} style={[ styles.messageWrapper,{ ...(message.name === "Benoit" ? styles.messageSent : styles.messageRecieved),},]}>
//               <View style={[styles.message,{...(message.username === "Ali" ? styles.messageSentBg : styles.messageRecievedBg),},]}>
//                 <Text style={styles.messageText}>{message.message}</Text>
//               </View>
//               <Text style={styles.timeText}>
//                 {new Date(message.timestamp).getHours()}:{String(new Date(message.timestamp).getMinutes()).padStart(2,"0")}
//               </Text>
//             </View>
//           ))}
//         </ScrollView>
//         <View style={styles.inputContainer}>
//           <TextInput style={styles.input} onChangeText={(value) => setMessageText(value)} value={messageText} autoFocus/>
//           <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage()} >
//             <MaterialIcons name="send" color="#ffffff" size={24}/>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#7c60b7",
//   },
//   inset: {
//     flex: 1,
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//     backgroundColor: "#ffffff",
//     width: "100%",
//     paddingTop: 20,
//     position: "relative",
//     borderTopColor: "#ffe099",
//     borderLeftColor: "#ffe099",
//     borderRightColor: "#ffe099",
//     borderTopWidth: 4,
//     borderRightWidth: 0.1,
//     borderLeftWidth: 0.1,
//   },
//   banner: {
//     width: "100%",
//     height: "15%",
//     paddingTop: 20,
//     paddingLeft: 20,
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   greetingText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 18,
//     marginLeft: 15,
//   },
//   message: {
//     paddingTop: 12,
//     paddingBottom: 12,
//     paddingRight: 20,
//     paddingLeft: 20,
//     borderRadius: 24,
//     alignItems: "flex-end",
//     justifyContent: "center",
//     maxWidth: "65%",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 6.41,
//     elevation: 1.2,
//   },
//   messageWrapper: {
//     alignItems: "flex-end",
//     marginBottom: 20,
//   },
//   messageRecieved: {
//     alignSelf: "flex-end",
//     alignItems: "flex-end",
//   },
//   messageSent: {
//     alignSelf: "flex-start",
//     alignItems: "flex-start",
//   },
//   messageSentBg: {
//     backgroundColor: "#rgba(71, 139, 188, 0.4)",
//   },
//   messageRecievedBg: {
//     backgroundColor: "#d6fff9",
//   },
//   messageText: {
//     color: "#506568",
//     fontWeight: "400",
//   },
//   timeText: {
//     color: "#506568",
//     opacity: 0.5,
//     fontSize: 10,
//     marginTop: 2,
//   },
//   inputContainer: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "center",
//     justifySelf: "flex-end",
//     alignContent: "flex-start",
//     marginBottom: 30,
//     marginTop: "auto",
//     background: "transparent",
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   input: {
//     backgroundColor: "#f0f0f0",
//     width: "80%",
//     padding: 14,
//     borderRadius: 30,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 6.41,
//     elevation: 1.2,
//   },
//   sendButton: {
//     borderRadius: 50,
//     padding: 16,
//     backgroundColor: "#ffe099",
//     marginLeft: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 6.41,
//     elevation: 1.2,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontWeight: "800",
//     textTransform: "uppercase",
//   },
//   scroller: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
// });
