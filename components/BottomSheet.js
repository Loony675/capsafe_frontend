import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
//update1

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useDispatch, useSelector } from "react-redux";

import OnVaOuScreen from "../screens/OnVaOuScreen.js";
import DepartureArrival from "../screens/DepartureArrivalScreen.js";
import Adresses from "../screens/AdressesScreen.js";
import ListTrajet from "../screens/ListTrajetsScreen.js";
import { isVisibleDeparture, isVisibleListTrajet } from "../reducers/isVisible.js";
import SelectTrajet from "../screens/SelectTrajet.js";
import MiseEnRelation from "../screens/MiseEnRelationScreen.js";

//hauteur = hauteur écran
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// définie la hauteur max
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 80;

const BottomSheet = () => {
  // stockage déplacement axe Y (vertical)
  const translateY = useSharedValue(0);

  // conserver la position précédente
  const context = useSharedValue({ y: 0 });

  // detection deplacement axe Y
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value}
  })
  .onUpdate((event) => {
    // console.log(event.translationY);
    translateY.value = event.translationY + context.value.y;
    // définie la hauteur max
    translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
  })
  .onEnd(() => {
    //définie la hauteur mini
    if (translateY.value > -SCREEN_HEIGHT / 6) {
      translateY.value = withTiming(-120)
      // console.log("Au mini");
    } 
    else if ((translateY.value < -SCREEN_HEIGHT / 5) && (translateY.value >-SCREEN_HEIGHT / 2)){
      translateY.value = withTiming(-SCREEN_HEIGHT +500)
      // console.log("Au milieu");

    } 
    else if (translateY.value < -SCREEN_HEIGHT / 2) {
      translateY.value = withTiming(MAX_TRANSLATE_Y)
      // console.log("Tout en haut");
    }
  });

  // affixes
  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 3);
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // test = Screen visible
  let screenVisible; 
	const visibleDA= useSelector((state) => state.isVisible.isVisibleDA);
  const visibleAddress = useSelector((state) => state.isVisible.isVisibleAddress)
  const visibleListTraj = useSelector((state => state.isVisible.isVisibleListTrajet))
  const visibleSelectTraj = useSelector((state) => state.isVisible.isVisibleSelectTrajet)
  console.log('-->', visibleListTraj.isVisibleListTrajet);
  if (visibleDA.isVisibleDA === true ) {
    screenVisible= (<DepartureArrival/>)
  } else if (visibleAddress.isVisibleAddressList === true) {
    screenVisible=(<Adresses/>)
  } else if (visibleListTraj.isVisibleListTrajet === true){
    screenVisible =(<ListTrajet/>)
  } else if (visibleSelectTraj.isVisibleSelectTrajet === true) {
    screenVisible = (<SelectTrajet/>)
  }
  else {
    screenVisible= (<OnVaOuScreen/>)
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line}></View>
        <View hide={true} style={styles.onVaOuContainer}>
          {screenVisible}
          {/* <SelectTrajet/> */}
          {/* <MiseEnRelation/> */}
          {/* <DepartureArrival/> */}
          {/* <ListTrajet/> */}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "rgba(71, 139, 188, 1)",
    position: "absolute",
    top: SCREEN_HEIGHT - 40,
    borderRadius: 25,

  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "black",
    borderRadius: 9999,
    alignSelf: "center",
    marginTop: 15,
  },
  onVaOuContainer: {
    alignItems: "center",
    marginTop: 10,

  },
});
//test
