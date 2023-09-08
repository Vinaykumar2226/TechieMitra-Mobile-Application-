import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { supabase } from "./Database";

export const CustomerHistoryDetails = (props) => {
  console.log(props.route.params);
  const ser_dtls = props.route.params.item;
  //   const tech_dtls = props.route.params.tech_dtls;
  console.log(ser_dtls);

  const [defaultrating, setDefaultrating] = useState(2);
  const [maxrating, setMaxrating] = useState([1, 2, 3, 4, 5]);
  const [review, setReview] = useState();

  async function postReview() {
    // console.log(defaultrating + "+" + review);
    const { error } = await supabase
      .from("servicedetails")
      .update({ rating: `${defaultrating}`, review: `${review}` })
      .eq("user_email", `${ser_dtls.user_email}`)
      .eq("store_email", `${ser_dtls.store_email}`);

    alert("Thanks for responding.");
    props.navigation.goBack();
    props.navigation.goBack();
  }

  const star =
    "https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true";
  const filledstar =
    "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true";

  const RatingBar = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {maxrating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultrating(item)}
            >
              <Image
                style={{ width: 40, height: 40, resizeMode: "cover" }}
                source={
                  item <= defaultrating ? { uri: filledstar } : { uri: star }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.logocontainer}>
        <Image
          source={require("./logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          height: "80%",
          borderWidth: 1,
          width: "95%",
          alignSelf: "center",
          marginTop: 15,
        }}
      >
        <ScrollView>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              alignSelf: "center",
              padding: 25,
              textDecorationLine: "underline",
            }}
          >
            Invoice
          </Text>
          <View style={{ alignSelf: "center" }}>
            <View>
              <Text style={styles.head}>Customer Details</Text>
              <Text style={styles.mndata}>
                <Text style={styles.innertxt}>Name of the Customer:</Text>
                {ser_dtls.customername}
                {"\n"}
                <Text style={styles.innertxt}>Contact: </Text>
                {ser_dtls.customer_contact}
                {"\n"}
                <Text style={styles.innertxt}>Email: </Text>
                {ser_dtls.user_email}
                {"\n"}
                <Text style={styles.innertxt}>Location </Text>:
                {ser_dtls.location}
                {"\n"}
                <Text style={styles.innertxt}>Adress of Customer: </Text>
                {ser_dtls.adress}
                {"\n"}
                <Text style={styles.innertxt}>Appliance: </Text>
                {ser_dtls.appliance}
                {"\n"}
                <Text style={styles.innertxt}>ServiceDescription: </Text>
                {ser_dtls.service_description}
                {"\n"}
              </Text>
            </View>
            <View>
              <Text style={styles.head}>Service Provider Details</Text>
              <Text style={styles.mndata}>
                <Text style={styles.innertxt}>Store Name:</Text>
                {ser_dtls.serviceprovider}
                {"\n"}
                <Text style={styles.innertxt}>Owner of Store:</Text>
                {ser_dtls.owner_name}
                {"\n"}
                <Text style={styles.innertxt}>Adress of Store:</Text>
                {ser_dtls.store_adress}
                {"\n"}
                <Text style={styles.innertxt}>contact:</Text>
                {ser_dtls.store_contact}
                {"\n"}
                <Text style={styles.innertxt}>email:</Text>
                {ser_dtls.store_email}
              </Text>
            </View>
            <View>
              <Text style={styles.head}>Service Details</Text>
              <Text style={styles.mndata}>
                <Text style={styles.innertxt}>Name of the Technician:</Text>
                {ser_dtls.name_of_tech}
                {"\n"}
                <Text style={styles.innertxt}>Contact:</Text>
                {ser_dtls.tech_contact}
                {"\n"}
                <Text style={styles.innertxt}>Date & time of Service:</Text>
                {ser_dtls.dateandtime}
                {"\n"}
                <Text style={styles.innertxt}>Work Description:</Text>
                {ser_dtls.work_description} {"\n"}
                <Text style={styles.innertxt}>Spare Parts Used:</Text>
                {ser_dtls.spare_parts}
                {"\n"}
                <Text style={styles.innertxt}>Cost of Spare Parts:</Text>
                {ser_dtls.cost_of_spareparts}
                {"\n"}
                <Text style={styles.innertxt}>Technician Charges:</Text>
                {ser_dtls.tech_charges}
                {"\n"}
                <Text style={styles.innertxt}>Total Bill :</Text>800
              </Text>
            </View>
          </View>
          <View
            style={{ padding: 20, display: ser_dtls.rating ? "none" : "flex" }}
          >
            <Text style={{ fontSize: 20 }}>
              Please Write a Review for Service Provider:
            </Text>
            <TextInput
              label="Review"
              mode="outlined"
              // value={text}
              onChangeText={(text) => setReview(text)}
            />
            <RatingBar />
            <Text style={{ fontSize: 15, alignSelf: "center" }}>
              {defaultrating + "/" + 5}
            </Text>

            <Button
              // icon="camera"
              mode="contained"
              onPress={() => postReview()}
              style={{ width: "80%", alignSelf: "center" }}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  head: {
    fontSize: 22,
    padding: 15,
    paddingLeft: 0,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  mndata: {
    fontSize: 17,
    alignSelf: "center",
    padding: 15,
    lineHeight: 30,
  },
  innertxt: { fontWeight: "bold" },
});
