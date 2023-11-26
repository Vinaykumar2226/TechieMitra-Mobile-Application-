import react from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
StatusBar.setBarStyle("light-content");
import { StatusBar } from "react-native";

export const ServiceReqcmp = (props) => {
  StatusBar.setBarStyle("light-content");

  console.log(props.route.params.cusdata);
  const backbtn = () => {
    props.navigation.goBack();
    props.navigation.goBack();
    props.navigation.goBack();
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          source={require("../assets/logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",

          height: "70%",
        }}
      >
        <Text style={{ fontSize: 30 }}>
          Yayy 🎉🎉🎉 You Have Successfully Requested a Service
        </Text>
        <Text style={{ fontSize: 15, color: "grey", paddingTop: 20 }}>
          Wait for Service Provider react to your request
        </Text>
        <TouchableOpacity onPress={() => backbtn()}>
          <View style={{}}>
            <Text style={{ fontSize: 15, paddingTop: 20 }}>
              Back To Dashboard
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    flex: 1,
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
});
