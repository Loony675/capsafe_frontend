import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.globalContainer}>
      <Modal
        style={styles.centeredView}
        animationType="slide"
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
              CapSafe a été fait par Ali, Benoit et Théo
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
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    height: "100%",
    backgroundColor: "rgba(71, 139, 188, 1)",
  },
  centeredView: {
    marginTop:'60%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(71, 139, 188, 1)",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
