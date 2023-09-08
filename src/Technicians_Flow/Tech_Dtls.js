import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { supabase } from "../Database";

export const Tech_Dtls = (props) => {
  const [techname, setTechname] = useState();
  const [techcontact, setTechcontact] = useState();
  const [workdesc, setWorkdesc] = useState();
  const [spareparts, setspareparts] = useState();
  const [costofspares, setcostofspares] = useState();
  const [techcharges, setTechcharges] = useState();

  const ser_dtls = props.route.params.ser_dtls;
  console.log(props.route.params.ser_dtls);

  async function onClick() {
    if (
      techcharges &&
      techcontact &&
      techname &&
      workdesc &&
      costofspares &&
      spareparts
    ) {
      const tech_dtls = {
        nameoftech: `${techname}`,
        contactoftech: `${techcontact}`,
        techcharges: `${techcharges}`,
        workdesc: `${workdesc}`,
        spareparts: `${spareparts}`,
        costofspares: `${costofspares}`,
      };

      const { error } = await supabase
        .from("servicedetails")
        .update({
          cost_of_spareparts: `${costofspares}`,
          name_of_tech: `${techname}`,
          work_description: `${workdesc}`,
          spare_parts: `${spareparts}`,
          tech_charges: `${techcharges}`,
          tech_contact: `${techcontact}`,
          dateandtime: `${new Date().getDate()}-${new Date().getMonth()}-
          ${new Date().getFullYear()} at ${new Date().getHours()} :
          ${new Date().getMinutes()}`,
        })
        .eq("user_email", `${ser_dtls.user_email}`)
        .eq("store_email", `${ser_dtls.store_email}`);

      props.navigation.navigate("Tech_Bill", { ser_dtls, tech_dtls });

      // fetch(`http://192.168.61.12:3000/data?query=
      // update servicedetails set cost_of_spareparts='${costofspares}',name_of_tech='${techname}',work_description='${workdesc}',spare_parts='${spareparts}',tech_charges='${techcharges}',tech_contact='${techcontact}' where user_email='${ser_dtls.user_email}'`).then(
      //   props.navigation.navigate("Tech_Bill", { ser_dtls, tech_dtls })
      // );
    } else {
      alert("Enter all the fields");
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.logocontainer}>
        <Image
          source={require("./logo2-removebg-preview.png")}
          style={styles.logo}
        />
      </View>
      <View style={{ height: "80%" }}>
        <ScrollView>
          <Text style={styles.title}>Service Details</Text>
          <View style={styles.dtlsCon}>
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>
              Electrical Appliance: {ser_dtls.appliance}
            </Text>

            <TextInput
              style={styles.txtinp}
              label="Name of the Technician"
              onChangeText={(text) => setTechname(text)}
            />
            <TextInput
              style={styles.txtinp}
              label="Contact"
              onChangeText={(text) => setTechcontact(text)}
            />
            <TextInput
              style={styles.txtinp}
              label="Work Description"
              onChangeText={(text) => setWorkdesc(text)}
            />
            <TextInput
              style={styles.txtinp}
              label="Spare Parts Used"
              onChangeText={(text) => setspareparts(text)}
            />
            <TextInput
              style={styles.txtinp}
              label="Cost of Spare Parts"
              onChangeText={(text) => setcostofspares(text)}
            />
            <TextInput
              style={styles.txtinp}
              label="Technician Charges"
              onChangeText={(text) => setTechcharges(text)}
            />
            <Button
              style={styles.btn}
              raised
              mode="contained"
              onPress={() => onClick()}
            >
              Generate Bill
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
  title: {
    fontSize: 30,
    paddingTop: 30,
    paddingLeft: 15,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  dtlsCon: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 16,
  },
  txtinp: {
    backgroundColor: "white",
    // borderRadius
    // padding: 10,
    margin: 10,
  },
  btn: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});
