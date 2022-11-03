import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Pusher from "pusher-js/react-native";
import { Audio } from "expo-av"
const pusher = new Pusher("9cf6d78d2a5981a0d45c", { cluster: "eu" });
  
  export default function ChatScreenTest({ navigation, route: { params } }) {
    
    const url = useSelector((state) => state.url.value);
    const BACKEND_ADDRESS = `http://${url}:3000`;
    
    const token = useSelector((state) => state.users.value.token); 
    const username = useSelector((state) => state.users.value.username);

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [recording, setRecording] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);
    const [sound, setSound] = useState(null);

<<<<<<< HEAD
    useEffect(() => {
      // const interval = setInterval(() => {
      //   console.log('This will be called every 2 seconds');
      // }, 2000);
      fetch(`${BACKEND_ADDRESS}/message/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token: 'ctK-p1A6zJYEV-fPNAcRVansbEX_eWnO' }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);

        //   const nbMessage = messages.length 
        //   for(let i = 0; i < nbMessage; i++){
        //     if(data[i].token=== token){
        //       console.log(nbMessage)
        //     // console.log(messages)         
        //     setMessages([...messages], data); 
        //   }
        //   else{
        //     console.log('ne rentre pas dans le if');
        //   }
        // }
          // let myMessage=[]
          // const myMessages= messages.map(myMessagesReceived => {
          //   console.log(myMessagesReceived.name);
          //   // if(myMessagesReceived.token === token){
          //   //  return myMessage.push(myMessagesReceived)
          //   // }
          //   // setMessages(myMessages);
=======
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/${username}`, { method: 'PUT' }); // a la connection pusher est informé que params.username à join le chanel
>>>>>>> 71d972135e2ba116ba9c22ad396a5215b1cf0529

    const subscription = pusher.subscribe('chat'); // attribution du channel chat 
    subscription.bind('pusher:subscription_succeeded', () => { // On s'assure de la liaison au chanel chat et que pusher renvoie subscription_succeeded
      subscription.bind('message', handleReceiveMessage); // On demande a pusher de nous faire une mise à jour l'orsque'un évenement 'message' lui parvient
    });

<<<<<<< HEAD
          // console.log(data)
          // return () => clearInterval(interval);

        });
    }, []);

    const handleSendMessage = () => {
      if (!messageText) {
        return;
      }
      const payload = {
=======
    return () => fetch(`${BACKEND_ADDRESS}/users/${username}`, { method: 'DELETE' }); // Lors de la destruction du useEffect (fermeture de la page)on interroge la route delete (suppression des messages du à la sortie du chanel)
  }, [username]); // rerender

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    })();
  }, []);

  useEffect(() => {
    if (sound) {
      return () => sound.unloadAsync();
    }
  }, [sound]);

  // Réception du message
  const handleReceiveMessage = (data) => {
    setMessages(messages => [...messages, data]);
  };

  //Envoi d'un message
  const handleSendMessage = () => {
    if (!messageText && !recordingUri) { // si ni message text ni message audio
      return;
    }
    let payload = {};
    let headers = {};

    if (messageText) { // si message text
      payload = JSON.stringify({
>>>>>>> 71d972135e2ba116ba9c22ad396a5215b1cf0529
        message: messageText,
        token1: token,
        timestamp: new Date(),
<<<<<<< HEAD
        token: 'ZKa72E5Q-zoSLDrleDzMWlUlXv5YUqdH',
        token2: 'ctK-p1A6zJYEV-fPNAcRVansbEX_eWnO',
        id: Math.floor(Math.random() * 100000),
      };
      fetch(`${BACKEND_ADDRESS}/message/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // setSended(!sended);
      setMessageText("");
      //update
      fetch(`${BACKEND_ADDRESS}/message/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token: 'ctK-p1A6zJYEV-fPNAcRVansbEX_eWnO' }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setMessages(data);
        })
    };


    const handleReceiveMessage = (data) => {
      setMessages((messages) => [...messages, data]);
    };
  
    useEffect(() => {
      fetch(`${BACKEND_ADDRESS}/message/${username}`, { method: "PUT" });
  
      const subscription = pusher.subscribe("chat");
      subscription.bind("pusher:subscription_succeeded", () => {
        subscription.bind("message", handleReceiveMessage);
      });
  
      return () => fetch(`${BACKEND_ADDRESS}/message/new`, { method: "DELETE" });
    }, []);
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          <ScrollView style={styles.scroller}  ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
            {messages.map((message, i) => (
              // console.log(message))
              <View key={i} style={[styles.messageWrapper,{...(message.tokenReceiver === !token? styles.messageSent : styles.messageRecieved),
                  },
                ]}>
                <View style={[styles.message,{...(message.tokenReceiver=== token? styles.messageSentBg: styles.messageRecievedBg),
                    },
                  ]}>   
                    <Text style={message.tokenReceiver=== !token ? styles.messageTextSend : styles.messageTextRecieved}>{message.name}</Text>
                  <Text style={message.tokenReceiver=== !token ? styles.messageTextSend : styles.messageTextRecieved}>{message.message}</Text>
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
      backgroundColor: "white",
    },
    messageSentBg: {
      backgroundColor: "rgba(71, 139, 188, 1)",

    },
    messageRecievedBg: {
      backgroundColor: "#f0f0f0",

    },
    messageTextSend: {
      color: "black",
      fontWeight: "400",
    },
    messageTextReceived:{
      color: "white",
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
=======
        type: 'text',
        token2: 'enTest'
      });
      headers = { 'Content-Type': 'application/json' };
>>>>>>> 71d972135e2ba116ba9c22ad396a5215b1cf0529
      
    } else if (recordingUri) { // Si message audio
      payload = new FormData();
      payload.append('audio', {
        uri: recordingUri,
        name: 'audio.m4a',
        type: 'audio/m4a',
      });

      payload.append('username', username);
      payload.append('createdAt', new Date().toString());
      payload.append('id', Math.floor(Math.random() * 100000));
      payload.append('type', 'audio');
    }
    // On interroge la route qui post un nouveau message
    fetch(`${BACKEND_ADDRESS}/message/message`, {
      method: 'POST',
      headers,
      body: payload,
    }).then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMessageText('');
          setRecordingUri(null);
        }
      });
    // on interroge la route qui affiche les messages
    fetch(`${BACKEND_ADDRESS}/message/displayMessages`, {
      method: 'POST',
      headers,
      body: payload,
    }).then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMessages(data);
        }
      });
  };

  const startRecording = async () => {
    const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    setRecording(recording);
  }

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
      setRecording(null);
    }
  }

  const playRecording = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri, overrideFileExtensionAndroid: 'm4a' });
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.banner}>
        <MaterialIcons name="keyboard-backspace" color="#ffffff" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.greetingText}>Welcome {username} 👋</Text>
      </View>

      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>
          {
            messages.map((message, i) => (
              <View key={i} style={[styles.messageWrapper, { ...(message.username === username ? styles.messageSent : styles.messageRecieved) }]}>
                <View style={[styles.message, { ...(message.username === username ? styles.messageSentBg : styles.messageRecievedBg) }]}>
                  {
                    message.type === 'audio'
                      ? (<TouchableOpacity onPress={() => playRecording(message.url)}>
                        <MaterialIcons name='multitrack-audio' size={24} style={styles.messageText} />
                      </TouchableOpacity>)
                      : <Text style={styles.messageText}>{message.text}</Text>
                  }
                </View>
                <Text style={styles.timeText}>{new Date(message.createdAt).getHours()}:{String(new Date(message.createdAt).getMinutes()).padStart(2, '0')}</Text>
              </View>
            ))
          }
        </ScrollView>
        <View style={styles.inputContainer}>
          {
            recording
              ? <TextInput value="Recording..." style={styles.input} />
              : <TextInput onChangeText={(value) => setMessageText(value)} value={recordingUri ? 'Audio message' : messageText} style={styles.input} />
          }
          <TouchableOpacity onPressIn={() => startRecording()} onPressOut={() => stopRecording()} style={styles.recordButton}>
            <MaterialIcons name="mic" color="#ffffff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSendMessage()} style={styles.sendButton}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  inset: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#ffffff',
    width: '100%',
    paddingTop: 20,
    position: 'relative',
    borderTopColor: '#ffe099',
    borderLeftColor: '#ffe099',
    borderRightColor: '#ffe099',
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  banner: {
    width: '100%',
    height: '15%',
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  greetingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: '65%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  messageSent: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  messageSentBg: {
    backgroundColor: '#ffad99',
  },
  messageRecievedBg: {
    backgroundColor: '#d6fff9'
  },
  messageText: {
    color: '#506568',
    fontWeight: '400',
  },
  timeText: {
    color: '#506568',
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    alignContent: 'flex-start',
    marginBottom: 30,
    marginTop: 'auto',
    background: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    width: '60%',
    padding: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  recordButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#ff5c5c',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#ffe099',
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  }
})