import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";

export default function MiseEnRelation({ route: { params } }) {
  return (
    <View style={styles.globalContainer}>
      <Text>TEST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    backgroundColor: "rgba(	124, 96, 183, 1)",
    height:'100%',
  },
});
