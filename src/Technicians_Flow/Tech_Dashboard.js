import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { Tech_History } from "./Tech_History";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";

import { BackHandler } from "react-native";
// import { white } from "react-native-paper/lib/typescript/styles/colors";

export const Tech_Dashboard = (props) => {
  StatusBar.setBarStyle("light-content");

  const [boool, setBoool] = useState(true);
  const tech_details = props.route.params;
  console.log(props.route.params);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        // Display an alert when the back button is pressed
        Alert.alert(
          "Exit App",
          "Are you sure you want to log out?",
          [
            {
              text: "Cancel",
              onPress: () => null, // Do nothing when canceled
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                // Perform any additional cleanup or exit actions if needed
                props.navigation.goBack();
                props.navigation.goBack();
                props.navigation.goBack(); // Exit the app
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

  const serviceHistory = () => {
    props.navigation.navigate("Tech_History", { tech_details });
    // backHandler.remove();
  };

  return (
    <View>
      <View style={styles.logocontainer}>
        <Image
          source={require("./logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.greet}>Hello Techie</Text>
        <Text style={{ paddingTop: 10, fontSize: 20, color: "grey" }}>
          {tech_details.owner_name}
        </Text>
        <Text style={{ paddingTop: 10, color: "grey" }}>
          {tech_details.storename} {"\n"}
          {tech_details.location}
          {"\n"}Mobile:{tech_details.mobile_number}
        </Text>
        <View style={styles.adress}>
          <Text style={{ color: "grey" }}>{tech_details.adress}</Text>
        </View>
      </View>
      <View style={styles.con3}>
        <Text>You may have the new Service Requests Check it here</Text>
        <Button
          raised
          mode="contained"
          onPress={() =>
            props.navigation.navigate("Tech_SerReq", { tech_details })
          }
        >
          Check
        </Button>
      </View>
      <View style={styles.con3}>
        <Text>Check the Service History Here</Text>
        <Button
          style={{ marginTop: 15 }}
          raised
          mode="contained"
          onPress={() => serviceHistory()}
        >
          Check
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight
  },
  logocontainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 140,

    justifyContent: "center",
  },
  logo: { marginTop: 20, height: 70, width: 400, alignSelf: "center" },
  location: {
    color: "white",
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  container2: {
    // backgroundColor: "yellow",
    padding: 20,
    marginTop: 10,
  },
  greet: {
    fontSize: 40,
    fontWeight: "bold",
    // fontFamily: "italic",
    // margin: 10,
  },
  adress: {
    width: "70%",
    // marginTop: 10,
  },
  con3: {
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
    width: "90%",
    alignSelf: "center",
    padding: 35,
    marginBottom: 15,
  },
});
