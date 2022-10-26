import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function onVaOu() {
  return (
    <View style={styles.globalContainer}>
      <View style={styles.container1}>
        <View style={styles.logo1C1}></View>
        <TouchableOpacity style={styles.button1}>
            <Text>On va où ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <Text>Rentrer à la maison</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    height: "40%",
    width: "80%",
    backgroundColor:'white',
    alignItems: "center",
    borderRadius:25,
  },
  container1: {
    flexDirection:'row',
    borderWidth:2,
    borderColor:'red',
    alignItems:'center',
    width:'100%',
    height:'50%',
    justifyContent:'center'
  },
  logo1C1: {
    height:40,
    width:40,
    backgroundColor: 'blue',
    marginRight:10,
  },
  button1:{
    borderWidth:1,
    height:40,
    justifyContent:'center'
  },
  container2: {
    borderWidth:2,
    width:'100%',
    height:'50%',
  },
});
