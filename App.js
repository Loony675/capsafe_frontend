import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
//Bibliothèque Fontwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";
//Import des screens
import HomeScreen from "./screens/HomeScreen";
import MainScreen from "./screens/MainScreen";
import ProfilScreen from "./screens/ProfilScreen";
import RouteScreen from "./screens/RouteScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ChatScreen from "./screens/ChatScreen";
import MessagingScreen from "./screens/MessagingScreen";
import ChatScreenTest from "./screens/ChatScreenTest";
import MessagingScreenTest from "./screens/MessagingScreenTest";
import MiseEnRelation from "./screens/MiseEnRelationScreen";
import SelectTrajet from "./screens/SelectTrajet";

//Import redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import users from "./reducers/users";
import url from "./reducers/url";
import isVisible from "./reducers/isVisible";

const store = configureStore({
  reducer: { users, url, isVisible },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Profil") {
            iconName = "user";
          } else if (route.name === "Main") {
            iconName = "home";
          } else if (route.name === "Messaging") {
            iconName = "envelope";
          } else if (route.name === "Settings") {
            iconName = "gear";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#61BEFF",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
        tabBarStyle: { backgroundColor: "black" },
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Messaging" component={MessagingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

      {/* <Tab.Screen name="MessagingTest" component={MessagingScreenTest} />
      <Tab.Screen name="ChatTest" component={ChatScreenTest} /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
          {/* <Stack.Screen name = "MiseEnRelation" component= {MiseEnRelation} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}

          <Stack.Screen name="Facebook" component={HomeScreen} />
          <Stack.Screen name="Google" component={HomeScreen} />
          {/* decommenter la ligne 78 après fin des test ligne 70 */}
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="profil" component={ProfilScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerTabNav: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
