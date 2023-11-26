import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { TotalLoginBackground } from "./TotalLoginBackground";
import { StatusBar } from "react-native";

export const Login_or_Signin = (props) => {
  StatusBar.setBarStyle("light-content");

  // const myname = route.params.myname;
  // console.log(props.route.params.myname);
  return (
    // <View><Text>></Text></View>
    <TotalLoginBackground>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("CustomerLogin")}
        style={{
          paddingHorizontal: 40,
          paddingTop: 60,
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
            Login
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("CustomerSignin")}
        style={{
          paddingHorizontal: 40,
          paddingTop: 40,
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
            Sign In
          </Text>
        </View>
      </TouchableOpacity>

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
        {"\n"}With Love,TechieMitra Team{"\n"}
      </Text>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            width: 80,
            height: 40,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Goback</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TotalLoginBackground>
  );
};
