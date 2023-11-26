import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { TotalLoginBackground } from "./TotalLoginBackground";
import { supabase } from "./Database";

// import Database from "./database_retrive";
import { Tech_Dashboard } from "./Technicians_Flow/Tech_Dashboard";

export const Tech_Auth = (props) => {
  // Databse Retrival
  const [dbdata, setdbData] = useState();

  async function retrive() {
    const dat = await supabase.from("spdetails").select("*");
    setdbData(dat.data);
    console.log(dbdata);
  }

  useEffect(() => {
    retrive();
  }, []);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handlePress() {
    if (dbdata) {
      const len = dbdata.length;
      let flag = 0;

      for (let i = 0; i < len; i++) {
        if (dbdata[i].email == email) {
          flag = i;
          break;
        }
      }
      if (email && password) {
        if (dbdata[flag].email == email) {
          console.log("Data");
          if (dbdata[flag].password == password) {
            // const cusdata = {
            //   UserName: dbdata[flag].Username,
            //   Email: email,
            //   Location: "",
            //   Appliance: "",
            //   SP: "",
            //   CustomerName: "",
            //   Adress: "",
            //   ServiceDescription: "",
            //   customer_contact: "",
            // };
            props.navigation.navigate("Tech_Dashboard", dbdata[flag]);
          } else {
            alert("incorrect password");
          }
        } else if (dbdata[flag].Email != email) {
          alert("Not a Valid Email");
        }
      } else {
        alert("Enter all the fields");
      }
    } else {
      alert("Data is Loading");
    }
  }

  return (
    <View>
      <TotalLoginBackground>
        <ScrollView>
          <View style={{ width: 300, alignSelf: "center", marginTop: "15%" }}>
            <View style={{ padding: 10 }}>
              <TextInput
                onChangeText={(a) => setEmail(a)}
                placeholder="Email"
                placeholderTextColor="white"
                style={{
                  height: 50,
                  color: "white",
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingLeft: 20,
                  borderColor: "orange",
                }}
              />
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                onChangeText={(b) => setPassword(b)}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="white"
                style={{
                  height: 50,
                  color: "white",
                  borderWidth: 2,
                  borderRadius: 10,
                  paddingLeft: 20,
                  borderColor: "orange",
                }}
              />
            </View>
          </View>
          <View style={{ paddingLeft: 15 }}>
            <Text style={{ color: "#FF4500", display: "none" }}>
              Incorrect Email or Username
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => console.log(props.dbdata)}
            onPress={() => handlePress()}
            // () => props.navigation.navigate("CustomerDashboard")
            style={{
              backgroundColor: "#FF4500",
              width: 200,
              alignSelf: "center",
              alignItems: "center",
              padding: 5,
              marginTop: "10%",
              borderRadius: 10,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Login
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
            Welcome to TechieMitra😊
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
        </ScrollView>
      </TotalLoginBackground>
      {/* <Database /> */}
    </View>
  );
};
