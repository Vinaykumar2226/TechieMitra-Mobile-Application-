import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { supabase } from "./Database";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { StatusBar } from "react-native";

export const CustomerDashboard = (props) => {
  const [selected, setSelected] = useState("");
  const [selectCity, setSelectCity] = useState("");
  console.log(selected);
  console.log(props.route.params.cusdata);
  const cusdata = props.route.params.cusdata;

  StatusBar.setBarStyle("light-content");

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        // Display an alert when the back button is pressed
        Alert.alert(
          "Exit App",
          "Are you sure you want to log out",
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

  const data = [
    { key: "1", value: "Air Conditioner" },
    { key: "2", value: "Owen" },
    { key: "3", value: "Cooler" },
    { key: "4", value: "Washing Machine" },
    { key: "5", value: "Refrigerator" },
    { key: "6", value: "Fan " },
    { key: "7", value: "Coffee Maker" },
    { key: "8", value: "RO Purifier" },
    { key: "9", value: "Rice Cooker" },
    { key: "10", value: "Dish Washer" },
    { key: "11", value: "Geysor" },
    { key: "12", value: "Mixer" },
  ];
  const cities = [
    { key: "1", value: "Hyderabad" },
    { key: "2", value: "Vadodara" },
    { key: "3", value: "Ahmedabad" },
    { key: "4", value: "Banglore" },
  ];

  // useEffect(()=>{},[])
  const next = () => {
    cusdata.Location = cities[selectCity - 1].value;
    cusdata.Appliance = data[selected - 1].value;
    props.navigation.navigate("SPsforAppliance", { cusdata });
  };

  async function handlepress() {
    if (selected && selectCity) {
      const dat = await supabase
        .from("Troubleshhot")
        .select("Stpes")
        .eq("Appliance", `${data[selected - 1].value}`);
      // console.log(dat.data[0].Stpes);

      Alert.alert(
        `Some Basic Troubleshooting steps for ${data[selected - 1].value}`,
        dat.data[0].Stpes,
        [
          {
            text: "Stay Back",
            // onPress: () => console.log("No Pressed"),
            style: "cancel", // This makes the "No" button appear in a different style (usually on the left).
          },
          {
            text: "go with Service Providers",
            onPress: () => {
              next();
              // You can perform your action here when "Yes" is pressed.
            },
          },
        ],
        { cancelable: false } // Prevents the alert from being dismissed when tapping outside.
      );
    } else {
      alert("Select appliance and city");
    }
  }

  async function handleclick(a) {
    if (selectCity) {
      const dat = await supabase
        .from("Troubleshhot")
        .select("Stpes")
        .eq("Appliance", `${a}`);
      // console.log(dat.data[0].Stpes);

      Alert.alert(
        `Some Basic Troubleshooting steps for ${a}`,
        dat.data[0].Stpes,
        [
          {
            text: "Stay Back",
            // onPress: () => console.log("No Pressed"),
            style: "cancel", // This makes the "No" button appear in a different style (usually on the left).
          },
          {
            text: "go with Service Providers",
            onPress: () => {
              cusdata.Location = cities[selectCity - 1].value;
              cusdata.Appliance = a;
              props.navigation.navigate("SPsforAppliance", { cusdata });
              // You can perform your action here when "Yes" is pressed.
            },
          },
        ],
        { cancelable: false } // Prevents the alert from being dismissed when tapping outside.
      );
    } else {
      alert("Select City");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          source={require("../assets/logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>

      <View style={{ height: "80%" }}>
        <ScrollView>
          <Text style={styles.greetuser}>Hello {cusdata.UserName}:)</Text>

          <Text style={{ padding: 10 }}>Select the Appliance below,</Text>

          <SelectList setSelected={(val) => setSelected(val)} data={data} />

          <Text style={{ padding: 10 }}>Select City</Text>

          <SelectList data={cities} setSelected={(val) => setSelectCity(val)} />
          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity
              /* onPress={() => props.navigation.navigate("SPsforAppliance")*/
              onPress={() => handlepress()}
            >
              <View style={styles.technicianbtn}>
                <Text style={{ color: "rgb(255,255,255)", fontWeight: "bold" }}>
                  Search for Technician
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            Some Frequent Services
          </Text>
          <View style={styles.iconcontainer}>
            <TouchableOpacity onPress={() => handleclick("Refrigerator")}>
              <View>
                <Image
                  source={require("../assets/Refrigerator.png")}
                  style={styles.iconstyle}
                />
                <Text> Refrigerator</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleclick("Air Conditioner")}>
              <View>
                <Image
                  source={require("../assets/Airconditioner.png")}
                  style={styles.iconstyle}
                />
                <Text> Air Conditioner</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.iconcontainer}>
            <TouchableOpacity onPress={() => handleclick("Cooler")}>
              <View style={{ marginLeft: 20 }}>
                <Image
                  source={require("../assets/Cooler.png")}
                  style={styles.iconstyle}
                />
                <Text> Cooler</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleclick("Washing Machine")}>
              <View>
                <Image
                  source={require("../assets/Washingmachine.png")}
                  style={styles.iconstyle}
                />
                <Text>Washing Machine</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.iconcontainer}>
            <TouchableOpacity onPress={() => handleclick("Mixer")}>
              <View style={{ marginLeft: -20 }}>
                <Image
                  source={require("../assets/Mixer.png")}
                  style={styles.iconstyle}
                />
                <Text> Mixer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleclick("Geysor")}>
              <View>
                <Image
                  source={require("../assets/Geyser.png")}
                  style={styles.iconstyle}
                />
                <Text style={{ paddingTop: 15 }}> Geyser</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("CustomerHistory", { cusdata })
              }
              // onPress={() => handlepress()}
            >
              <View
                style={{
                  backgroundColor: "#6495ED",
                  padding: 15,
                  width: 200,
                  alignSelf: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "rgb(255,255,255)", fontWeight: "bold" }}>
                  Service History
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
  },
  logocontainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 140,

    justifyContent: "center",
  },
  logo: {
    marginTop: 20,
    height: 70,
    width: 400,
    alignSelf: "center",
  },
  location: {
    color: "white",
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  greetuser: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
  },
  iconcontainer: {
    flexDirection: "row",
    padding: 15,

    justifyContent: "space-evenly",
  },
  technicianbtn: {
    backgroundColor: "#FF4500",
    padding: 15,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  iconstyle: { alignSelf: "center" },
});
