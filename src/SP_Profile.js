import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { supabase } from "./Database";

export const SpProfile = (props) => {
  const [data, setData] = useState();
  const [avgrating, setAvgrating] = useState();

  // console.log(props.route.params);
  const cusdata = props.route.params.cusdata;
  const spdata = props.route.params.a;
  // console.log(spdata.reviews[0]);

  async function calculateAverage() {
    const { data, error } = await supabase
      .from("servicedetails") // Replace with your table name
      .select("rating")
      // .neq("rating", "")
      .eq("store_email", `${spdata.email}`); // Replace with your column name

    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].rating != null) {
        sum = data[i].rating + sum;
        count += 1;
      }
    }
    setAvgrating(sum / count);
  }

  async function retrive() {
    const dat = await supabase
      .from("servicedetails")
      .select()
      .eq("store_email", `${spdata.email}`);
    setData(dat.data);
  }

  // console.log(spdata.email);
  useEffect(() => {
    retrive();
    calculateAverage();
  }, []);

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
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/spprofile.png")}
              style={{ top: 20, width: 370, height: 200 }}
            />
          </View>

          <View>
            <Text
              style={{ top: 20, padding: 20, fontSize: 30, fontWeight: "bold" }}
            >
              {spdata.storename}
            </Text>
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 15, color: "grey" }}>
                Rated {avgrating} out of 5 {"\n"}
                {"\n"}
                {spdata.adress}
                {"\n"}
                {"\n"}Some more information about the service providers
                profile.We are commited to do the work.we are responsible for
                your appliances.Our Technicians are approved by the
                Government.hasslefree service in your finger tips
              </Text>
              <Text style={{ fontSize: 15, paddingTop: 10 }}>
                Store Owner : {spdata.owner_name}
                {"\n"}Contact: {spdata.mobile_number}
              </Text>
              <Text
                style={{
                  color: "#FF4500",
                  fontSize: 35,
                  top: 15,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                We Offer
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                right: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity>
                <View style={styles.spofferview}>
                  <Image
                    source={require("../assets/Service.jpg")}
                    style={styles.offerlogo}
                  />
                  <Text style={styles.spoffertxt}>Service</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.spofferview}>
                  <Image
                    source={require("../assets/Repair.jpg")}
                    style={styles.offerlogo}
                  />
                  <Text style={styles.spoffertxt}>Repair</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.spofferview}>
                  <Image
                    source={require("../assets/Installation.jpg")}
                    style={styles.offerlogo}
                  />
                  <Text style={styles.spoffertxt}>Installation</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 20, color: "grey" }}>
                Air Conditioners{"\n"}Geysors{"\n"}Refrigerators{"\n"}Owens
                {"\n"}
                Coolers{"\n"}and Other electrical Appliances
              </Text>
              <Text
                style={{
                  color: "#FF4500",
                  fontSize: 35,
                  top: 15,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Payment options
              </Text>
              <View style={{ paddingTop: 30 }}>
                <Text style={{ fontSize: 17, lineHeight: 30 }}>
                  We accept all types of Payments{"\n"}UPI{"\n"}Debit Card{"\n"}
                  Credit Card{"\n"}Cash.
                </Text>
              </View>
              <View style={styles.reviews_container}>
                <Text
                  style={{
                    color: "#FF4500",
                    fontSize: 35,
                    top: 15,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Reviews
                </Text>
                {/*  */}
                {data ? (
                  data.map((item, key) => {
                    return (
                      <View style={{ paddingTop: 40 }} key={item.id}>
                        <View>
                          <View
                            style={{
                              borderWidth: 1,
                              padding: 10,
                            }}
                          >
                            <View
                              style={{
                                // borderWidth: 1,
                                // padding: 10,
                                flex: 1,
                                flexDirection: "row",
                              }}
                            >
                              <Image
                                style={styles.reviewimg}
                                source={require("../assets/user.png")}
                              />

                              <Text
                                style={{
                                  padding: 10,
                                  fontSize: 15,
                                  fontWeight: "bold",
                                }}
                              >
                                {item.customername}
                              </Text>

                              <Image
                                style={{ width: 20, height: 20, marginTop: 7 }}
                                source={{
                                  uri: "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true",
                                }}
                              />
                              <Text style={{ marginTop: 10, marginLeft: 5 }}>
                                {item.rating}/5
                              </Text>
                            </View>

                            <View
                              style={{
                                padding: 20,
                              }}
                            >
                              <Text>{item.review}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text>Loading</Text>
                )}
                {/*  */}
              </View>

              <View style={{ alignItems: "center", paddingTop: 25 }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("CustomerDetails", { cusdata })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#FF4500",
                      width: 250,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      Request a Service
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  offerlogo: {
    top: 20,
    width: 130,
    height: 130,
  },
  spofferview: { alignItems: "center" },
  spoffertxt: {
    fontSize: 25,
    color: "#6495ED",
    fontWeight: "bold",
  },
  reviewimg: {
    width: 40,
    height: 40,
  },
});
