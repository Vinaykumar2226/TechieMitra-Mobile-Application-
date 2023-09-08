import React from "react";
import { Text, View, Stylesheet, TouchableOpacity } from "react-native";
import { TotalLoginBackground } from "./TotalLoginBackground";
import { Tech_login } from "./Tech_login";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

export const Loginpagef = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        // Display an alert when the back button is pressed
        Alert.alert(
          "Exit App",
          "Are you sure you want to logged out and exit?",
          [
            {
              text: "Cancel",
              onPress: () => null, // Do nothing when canceled
              style: "cancel",
            },
            {
              text: "Exit",
              onPress: () => {
                // Perform any additional cleanup or exit actions if needed
                BackHandler.exitApp(); // Exit the app
              },
            },
          ],
          { cancelable: false }
        );

        return true; // Prevent default back button behavior
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => {
        // Unsubscribe from the BackPress event when the screen loses focus
        backHandler.remove();
      };
    }, [])
  );

  return (
    <TotalLoginBackground>
      <Text
        style={{
          color: "#FF4500",
          margin: 25,
          fontWeight: "bold",
          fontSize: 40,
        }}
      >
        Hello,
      </Text>
      <Text
        style={{
          color: "rgb(255,255,255)",
          fontWeight: "bold",
          marginBottom: "20%",

          margin: 20,
        }}
      >
        Welcome to TechieMitra😊{"\n"}Thanks for choosing our App{"\n"}we are
        always here to serve you...{"\n"}
        {"\n"}With Love,TechieMitra Team
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login_or_Signin")}
        style={{
          paddingHorizontal: 40,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FF4500",
            height: 40,
            borderRadius: 60,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Service Seeker
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Tech_login")}
        style={{
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#6495ED",
            height: 40,
            borderRadius: 60,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            Technician
          </Text>
        </View>
      </TouchableOpacity>
    </TotalLoginBackground>
  );
};
