import { StyleSheet, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import { StatusBar } from "react-native";

export const Tech_Bill = (props) => {
  StatusBar.setBarStyle("light-content");

  console.log(props.route.params);
  const ser_dtls = props.route.params.ser_dtls;
  const tech_dtls = props.route.params.tech_dtls;

  // useEffect(() => {
  //   fetch();
  // });

  return (
    <View>
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
                {tech_dtls.nameoftech}
                {"\n"}
                <Text style={styles.innertxt}>Contact:</Text>
                {tech_dtls.contactoftech}
                {"\n"}
                <Text style={styles.innertxt}>
                  Date & time of Service Completion:{" "}
                </Text>
                {new Date().getDate()}-{new Date().getMonth()}-
                {new Date().getFullYear()} at {new Date().getHours()} :
                {new Date().getMinutes()}
                {"\n"}
                <Text style={styles.innertxt}>Work Description:</Text>
                {tech_dtls.workdesc} {"\n"}
                <Text style={styles.innertxt}>Spare Parts Used:</Text>
                {tech_dtls.spareparts}
                {"\n"}
                <Text style={styles.innertxt}>Cost of Spare Parts:</Text>
                {tech_dtls.costofspares}
                {"\n"}
                <Text style={styles.innertxt}>Technician Charges:</Text>
                {tech_dtls.techcharges}
                {"\n"}
                <Text style={styles.innertxt}>Total Bill :</Text>
                {parseInt(tech_dtls.costofspares) +
                  parseInt(tech_dtls.techcharges)}
              </Text>
            </View>
          </View>
          <Button
            // style={{ width: "90%" }}
            raised
            mode="contained"
            onPress={() => {
              props.navigation.goBack();
              props.navigation.goBack();
              props.navigation.goBack();

              props.navigation.goBack();
            }}
          >
            Home
          </Button>
        </ScrollView>
      </View>
    </View>
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
