import React, { useEffect } from "react";
import {
  View,
  Image,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";

export const Onboarding = (props) => {
  StatusBar.setBarStyle("light-content");

  const translateY = new Animated.Value(0);
  // const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // Animation complete, navigate to the next screen
      setTimeout(() => {
        props.navigation.navigate("Loginpagef");
      }, 1000); // Wait for 3 seconds before navigating
    });
  }, []);

  return (
    <ImageBackground source={require("../assets/bcg.jpg")} style={styles.back}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "rgb(0,0,0)",
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 0.6],
                  outputRange: [300, 0],
                }),
              },
            ],
          }}
        >
          <Image
            style={{ width: 400, height: 80 }}
            source={require("../assets/logo2-removebg-preview.png")}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  back: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    // marginTop: 30,
    // position: "relative",
  },
});
