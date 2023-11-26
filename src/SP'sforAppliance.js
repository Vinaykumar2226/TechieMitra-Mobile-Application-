import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { supabase } from "./Database";
import { StatusBar } from "react-native";

export const SPsforAppliance = (props) => {
  const [serpro, setSerpro] = useState();
  StatusBar.setBarStyle("light-content");

  async function retrive() {
    const dat = await supabase.from("spdetails").select("*");
    setSerpro(dat.data);
  }

  // let appliance = "Geysor";
  // console.log(props.route.params.cusdata);
  const cusdata = props.route.params.cusdata;

  useEffect(() => {
    retrive();
    console.log(serpro);
  }, []);

  const handleclick = (a) => {
    cusdata.SP = a.storename;
    cusdata.store_owner = a.owner_name;
    cusdata.store_adress = a.adress;
    cusdata.store_contact = a.mobile_number;
    cusdata.store_email = a.email;

    // console.log(cusdata);
    // console.log(a);
    // console.log(cusdata);

    props.navigation.navigate("SpProfile", { cusdata, a });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          source={require("../assets/logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.text}>Service providers for {cusdata.Appliance}</Text>

      <View style={styles.spcontainer}>
        <ScrollView>
          {serpro ? (
            serpro.map((item, key) => {
              if (item.location == cusdata.Location) {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      // borderBottomWidth: 1,
                      // borderRadius: 25,
                      // padding: 10,
                    }}
                    key={item.id}
                  >
                    <Image
                      source={require("../assets/splogo.png")}
                      style={styles.splogog}
                    />
                    <View
                      style={{
                        top: 60,
                        right: 10,
                        display: "flex",
                        // backgroundColor: "green",
                        width: "60%",
                      }}
                    >
                      <TouchableOpacity onPress={() => handleclick(item)}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            // flexWrap: "wrap",
                            // backgroundColor: "red",
                            width: "80%",
                          }}
                        >
                          {item.storename}
                        </Text>
                        <Text style={{ paddingTop: 15 }}>{item.location}</Text>
                        <View style={{ width: "90%" }}>
                          <Text>{item.adress}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })
          ) : (
            <Text>Loading Please Wait...</Text>
          )}
        </ScrollView>
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
  text: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    textDecorationLine: "underline",
    top: 15,
  },
  spcontainer: {
    // top: 30,
    backgroundColor: "white",
    //flex: 1,
    //width: "100%",
    height: 600,
  },
  splogog: {
    width: 200,
    height: 200,
  },
});
