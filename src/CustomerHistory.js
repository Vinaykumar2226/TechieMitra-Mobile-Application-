import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { supabase } from "./Database";

export const CustomerHistory = (props) => {
  const [ser_dtls, setSer_dtls] = useState("");
  const cusdata = props.route.params.cusdata;
  console.log(cusdata.Email);

  async function retrive() {
    const dat = await supabase
      .from("servicedetails")
      .select("*")
      .eq("user_email", `${cusdata.Email}`);
    //   .or("status.eq.Rejected,status.eq.Completed");
    setSer_dtls(dat.data);
  }

  useEffect(() => {
    retrive();
    // fetch(`http://192.168.61.12:3000/data?query=
    // select * from servicedetails where (store_email='${tech_details.email}' and status='Rejected') or (store_email='${tech_details.email}' and status='Completed');`)
    //   .then((response) => response.json())
    // .then((json) => setSer_dtls(json));
    // .catch((error) => alert(error));
    // .finally(() => alert("inserted succesfully"));
  }, []);
  console.log(ser_dtls);

  const handleClick = (item) => {
    item.status == "Rejected"
      ? alert(`Reason of Rejection is:${item.reject_service}`)
      : props.navigation.navigate("CustomerHistoryDetails", { item });
  };

  return (
    <SafeAreaView>
      <View style={styles.logocontainer}>
        <Image
          source={require("./logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Service History</Text>
      <View style={{ alignItems: "center", paddingTop: 39, height: "70%" }}>
        <ScrollView>
          {ser_dtls && ser_dtls.length != 0 ? (
            ser_dtls.map((item, key) => {
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() =>
                      /*props.navigation.navigate("History_details", { item })*/
                      handleClick(item)
                    }
                  >
                    <View style={styles.Srcon}>
                      <Text style={{ fontSize: 30 }}>{item.appliance}</Text>
                      <Text style={{ fontSize: 18 }}>{item.customername}</Text>
                      <Text style={{ fontSize: 18 }}>
                        {item.adress}
                        {"\n"}
                      </Text>
                      <Text style={{ fontSize: 18 }}>
                        Status: {item.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text>No Requests Found Now....</Text>
          )}
          {/* <View style={styles.Srcon}>
            <Text style={{ fontSize: 30 }}>Geysor</Text>
            <Text style={{ fontSize: 18 }}>Rahul Maddineni</Text>
            <Text style={{ fontSize: 18 }}>
              Kalyan Nagar Kulakacherla,Vikarabad Dist,Telangana{"\n"}
            </Text>
            <Text style={{ fontSize: 18 }}>Status: In Progress 🟡</Text>
          </View>
          <View style={styles.Srcon}>
            <Text style={{ fontSize: 30 }}>Geysor</Text>
            <Text style={{ fontSize: 18 }}>Rahul Maddineni</Text>
            <Text style={{ fontSize: 18 }}>
              Kalyan Nagar Kulakacherla,Vikarabad Dist,Telangana{"\n"}
            </Text>
            <Text style={{ fontSize: 18 }}>Status: Closed 🔵</Text>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: Constants.statusBarHeight },
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
  title: {
    fontSize: 30,
    paddingTop: 30,
    paddingLeft: 15,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  Srcon: {
    // width: "102%",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 16,
    margin: 10,
  },
});
