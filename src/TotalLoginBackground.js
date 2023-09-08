import React, { Children, cloneElement, isValidElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

export const TotalLoginBackground = ({ children }) => {
  return (
    <View style={{ paddingTop: Constants.statusBarHeight }}>
      <ImageBackground
        source={require("../assets/bcg.jpg")}
        style={styles.back}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/logo2-removebg-preview.png")}
            style={{
              height: 70,
              width: 400,
            }}
          />
        </View>
        <View style={styles.container}>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return null;

            return cloneElement(child, {
              ...child.props,
            });
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,

    width: 300,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
  },

  back: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    // position: "relative",
  },
});
