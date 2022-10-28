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
//Import redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import users from "./reducers/users";
import url from "./reducers/url";

const store = configureStore({
  reducer: { users, url },
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

        tabBarActiveTintColor: "#478bbc",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Messaging" component={MessagingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Messaging" component={MessagingScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Facebook" component={HomeScreen} />
          <Stack.Screen name="Google" component={HomeScreen} />
          {/* decommenter la ligne 78 après fin des test ligne 70 */}
          {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
          <Stack.Screen name="profil" component={ProfilScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
