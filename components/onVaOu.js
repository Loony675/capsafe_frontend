import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function onVaOu() {
  return (
    <View style={styles.test}>
    <Text>
      Test
    </Text>
  </View>
  )
}

const styles = StyleSheet.create({
    test: {
        borderWidth:3
    }
})