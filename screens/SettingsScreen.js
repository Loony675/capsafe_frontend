import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.globalContainer}>
      <Modal
        style={styles.centeredView}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              CapSafe est un projet réalisé en deux semaines par trois élèves de
              La Capsule.
            </Text>
            <Text >
              Nous espérons que cette application vous plaira autant qu'il nous
              a plus de vous la faire en partant d'une page blanche.
            </Text>
            <Text style={{fontWeight:'600', marginTop:10,}}> 

            Ali Benoit Théo
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <View style={styles.titleContainer}>
        <Text style={styles.title}>Réglages</Text>
        <View style={styles.borderBottom}></View>
      </View>
      <View style={styles.container2}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>A propos de nous</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    height: "100%",
    backgroundColor: "rgba(71, 139, 188, 1)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  titleContainer: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(71, 139, 188, 1)",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "white",
  },
  container2:{
    marginTop:'70%',
    alignItems:'center',
    justifyContent:'center',
  },
  borderBottom: {
    width: "80%",
    borderBottomWidth: 5,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    width:150,
    backgroundColor: "#f4a261",
  },
  buttonClose: {
    backgroundColor: "#f4a261",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default App;
