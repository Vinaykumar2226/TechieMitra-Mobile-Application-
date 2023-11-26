import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Checkbox } from "react-native-paper";
import { supabase } from "./Database";
import { StatusBar } from "react-native";

export const CustomerSignin = (props) => {
  StatusBar.setBarStyle("light-content");

  const [checked, setChecked] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const tc = `1. Acceptance of Terms
  By using the Service, you agree to these Terms and any additional terms and policies referenced herein.

  
  2. Privacy
  
  Your use of the Service is also governed by our Privacy Policy, which is available at [link to privacy policy]. Please review our Privacy Policy to understand how we collect, use, and disclose information.
  
  3. User Registration
  
  a. To access certain features of the Service, you may be required to register for an account. You agree to provide accurate and complete information during the registration process.
  
  b. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`;

  async function handlePress() {
    if (firstName && lastName && email && mobile && password && rePassword) {
      if (emailRegx.test(email)) {
        if (passRegx.test(password)) {
          if (password == rePassword) {
            if (checked) {
              const data = await supabase.from("ssdetails").insert({
                Email: `${email}`,
                Password: `${password}`,
                Username: `${firstName}`,
                Mobile: `${mobile}`,
              });
              alert(
                "Created account successfully.Now Login with your credentials"
              );
              props.navigation.goBack();
            } else {
              alert("Accept the terms And Conditions");
            }
          } else {
            alert("Passwords Should match");
          }
        } else {
          alert(
            "Password Should Contain 8 letters,1 Uppercase 1Lower case 1Number 1 Special Symbol"
          );
        }
      } else {
        alert("Enter a Valid Email");
      }
    } else {
      alert("Enter all Fields");
    }
  }

  return (
    <View>
      <ImageBackground
        source={require("../assets/bcg.jpg")}
        style={styles.back}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.label}>Create Your Account</Text>
            <View style={{ width: 300, alignSelf: "center", marginTop: "8%" }}>
              <View style={styles.inpcontainer}>
                <TextInput
                  onChangeText={(a) => setFirstName(a)}
                  placeholder="First Name"
                  placeholderTextColor="white"
                  style={styles.txtinp}
                />
              </View>
              <View style={styles.inpcontainer}>
                <TextInput
                  onChangeText={(a) => setLastName(a)}
                  placeholder="Last Name"
                  placeholderTextColor="white"
                  style={styles.txtinp}
                />
              </View>
              <View style={styles.inpcontainer}>
                <TextInput
                  onChangeText={(a) => setEmail(a)}
                  placeholder="Email"
                  placeholderTextColor="white"
                  style={styles.txtinp}
                />
              </View>
              <View style={styles.inpcontainer}>
                <TextInput
                  onChangeText={(a) => setMobile(a)}
                  placeholder="Mobile Number"
                  placeholderTextColor="white"
                  style={styles.txtinp}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.inpcontainer}>
                <TextInput
                  onChangeText={(a) => setPassword(a)}
                  secureTextEntry={true}
                  placeholder="Password"
                  icon={
                    <TextInput.icon>
                      <Text style={{ color: "white" }}>Show</Text>
                    </TextInput.icon>
                  }
                  placeholderTextColor="white"
                  style={styles.txtinp}
                />
              </View>
              <View style={styles.inpcontainer}>
                <TextInput
                  onChangeText={(a) => setRePassword(a)}
                  secureTextEntry={true}
                  placeholder="Re Enter Password"
                  placeholderTextColor="white"
                  style={styles.txtinp}
                />
              </View>
            </View>
            {/* <Text style={{ color: "red", alignSelf: "center" }}>
              Enter a Valid Password
            </Text> */}
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <TouchableOpacity
                onPress={() => Alert.alert("Terms And Conditions", tc)}
              >
                <Text style={{ color: "white", marginTop: 5 }}>
                  Terms and Conditionss
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => handlePress()}
              style={{
                backgroundColor: "#FF4500",
                width: 200,
                alignSelf: "center",
                alignItems: "center",
                padding: 5,
                borderRadius: 10,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", padding: 10 }}>
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
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    height: "100%",
    width: "100%",
    //justifyContent: "space-around",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 600,
    width: 300,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "30%",
  },
  label: {
    color: "#FF4500",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 30,
    paddingLeft: 10,
  },
  txtinp: {
    height: 40,
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 20,
    borderColor: "orange",
  },
  inpcontainer: {
    padding: 10,
  },
});
