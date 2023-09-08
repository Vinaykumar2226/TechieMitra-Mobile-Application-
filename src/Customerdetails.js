import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { TextInput, Button } from "react-native-paper";
import { supabase } from "./Database";

//import { ScrollView } from "react-native-gesture-handler";

export const CustomerDetails = (props) => {
  console.log(props.route.params.cusdata);
  const cusdata = props.route.params.cusdata;
  const [cusname, setCusname] = useState();
  const [contact, setContact] = useState();
  const [serdis, setSerdis] = useState();
  const [adress, setAdress] = useState();
  console.log(cusname);

  async function sendData() {
    const { error } = await supabase.from("servicedetails").insert({
      // id: 1,
      customername: `${cusdata.CustomerName}`,
      appliance: `${cusdata.Appliance}`,
      adress: `${cusdata.Adress}`,
      user_email: `${cusdata.Email}`,
      location: `${cusdata.Location}`,
      customer_contact: `${cusdata.customer_contact}`,
      serviceprovider: `${cusdata.SP}`,
      service_description: `${cusdata.ServiceDescription}`,
      owner_name: `${cusdata.store_owner}`,
      store_contact: `${cusdata.store_contact}`,
      store_adress: `${cusdata.store_adress}`,
      store_email: `${cusdata.store_email}`,
      status: "Open",
    });
    console.log(error);
  }

  const handleclick = () => {
    if (cusname && contact && serdis && adress) {
      cusdata.CustomerName = cusname;
      cusdata.customer_contact = contact;
      cusdata.ServiceDescription = serdis;
      cusdata.Adress = adress;

      console.log(cusdata);

      sendData();
      props.navigation.navigate("ServiceReqcmp", { cusdata });

      // fetch(
      //   `http://192.168.61.12:3000/data?query=insert into servicedetails(customername,appliance,adress,user_email,location,customer_contact,serviceprovider,service_description,owner_name,store_contact,store_adress,store_email,status) values('${cusdata.CustomerName}','${cusdata.Appliance}','${cusdata.Adress}','${cusdata.Email}','${cusdata.Location}','${cusdata.customer_contact}','${cusdata.SP}','${cusdata.ServiceDescription}','${cusdata.store_owner}','${cusdata.store_contact}','${cusdata.store_adress}','${cusdata.store_email}','Open')`
      // ).then(() => props.navigation.navigate("ServiceReqcmp", { cusdata }));
    } else {
      alert("Enter all the fields");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          source={require("../assets/logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <View style={{ padding: 10, height: "80%" }}>
        <ScrollView>
          <Text
            style={{
              fontSize: 37,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Service Details
          </Text>
          <View style={{ paddingTop: 40 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.inptxt}>
                Electrical Appliance :{"\n"}Service Provider :
              </Text>
              <Text style={{ flexShrink: 1, fontSize: 20, lineHeight: 29 }}>
                {cusdata.Appliance} {"\n"} {cusdata.SP}
              </Text>
            </View>

            <TextInput
              style={styles.txtinp}
              label="Customer Name"
              onChangeText={(a) => setCusname(a)}
            />
            <TextInput
              style={styles.txtinp}
              label="Contact Number"
              onChangeText={(a) => setContact(a)}
            />
            <TextInput
              style={styles.txtinp}
              label="Service Description"
              onChangeText={(a) => setSerdis(a)}
            />
            <TextInput
              style={styles.txtinp}
              label="Adress"
              onChangeText={(a) => setAdress(a)}
            />

            <View style={{ alignItems: "center", paddingTop: 50 }}>
              <TouchableOpacity onPress={() => handleclick()}>
                <View
                  style={{
                    backgroundColor: "#FF4500",
                    width: 200,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 14,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                  >
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
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
  inptxt: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: "bold",
  },
  // txtinp: { borderWidth: 1, height: 40, padding: 10, borderRadius: 10 },

  txtinp: {
    backgroundColor: "white",
    // borderRadius
    // padding: 10,
    margin: 10,
  },
});
