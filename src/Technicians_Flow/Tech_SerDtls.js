import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Dialog,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "../Database";

export const Tech_SerDtls = (props) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [workStarted, setWorkStarted] = useState(false);
  const [rejreason, setRejreason] = useState();

  const ser_dtls = props.route.params.item;
  console.log(props.route.params.item);

  useEffect(() => {
    if (ser_dtls.status != "Open") {
      setAccept(true);
      setWorkStarted(true);
    }
  }, []);

  const onAccept = () => {
    setAccept(true);
  };
  async function onStartWork() {
    setWorkStarted(true);

    const { error } = await supabase
      .from("servicedetails")
      .update({ status: "In Progress" })
      .eq("user_email", `${ser_dtls.user_email}`)
      .eq("store_email", `${ser_dtls.store_email}`);
    console.log(error);

    // fetch(`http://192.168.61.12:3000/data?query=
    //   update servicedetails set status='In Progress' where user_email='${ser_dtls.user_email}'`);
  }

  async function onWorkCompleted() {
    const { error } = await supabase
      .from("servicedetails")
      .update({ status: "Completed" })
      .eq("user_email", `${ser_dtls.user_email}`)
      .eq("store_email", `${ser_dtls.store_email}`);

    // fetch(`http://192.168.61.12:3000/data?query=
    //   update servicedetails set status='Completed' where user_email='${ser_dtls.user_email}'`).then(
    props.navigation.navigate("Tech_Dtls", { ser_dtls });
  }

  async function onSend() {
    const { error } = await supabase
      .from("servicedetails")
      .update({ status: "Rejected", reject_service: `${rejreason}` })
      .eq("user_email", `${ser_dtls.user_email}`)
      .eq("store_email", `${ser_dtls.store_email}`);

    alert("Thanks for responding");
    setIsDialogVisible(false);
    props.navigation.goBack();
    props.navigation.goBack();

    // fetch(`http://192.168.61.12:3000/data?query=
    //   update servicedetails set status='Rejected',reject_service='${rejreason}' where user_email='${ser_dtls.user_email}'`)
    //   .then(() => alert("Thanks for responding"))
    //   .then(() => setIsDialogVisible(false))
    //   .then(() => props.navigation.goBack())
    //   .then(() => props.navigation.goBack());
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
            <Text style={styles.qa}>Customer Name</Text>
            <Text style={styles.aq}>{ser_dtls.customername}</Text>
            <Text style={styles.qa}>Mobile</Text>
            <Text style={styles.aq}>{ser_dtls.customer_contact}</Text>

            <Text style={styles.qa}>Electrical Appliance</Text>
            <Text style={styles.aq}>{ser_dtls.appliance}</Text>
            <Text style={styles.qa}>Adress</Text>
            <Text style={styles.aq}>{ser_dtls.adress}</Text>
            <Text style={styles.qa}>Service Description</Text>
            <Text style={styles.aq}>{ser_dtls.service_description}</Text>
          </View>
          <View style={styles.btn}>
            <Button
              raised
              mode="contained"
              style={{ backgroundColor: "red" }}
              onPress={() => setIsDialogVisible(true)}
            >
              Reject
            </Button>
            <Button
              raised
              disabled={accept}
              mode="contained"
              onPress={() => onAccept()}
            >
              Accept
            </Button>
          </View>
          <View
            style={
              ([styles.startworkbtn], { display: accept ? "flex" : "none" })
            }
          >
            <Button
              raised
              disabled={workStarted}
              mode="contained"
              style={{
                backgroundColor: workStarted ? "grey" : "red",
                width: "50%",
                alignSelf: "center",
              }}
              onPress={() => onStartWork()}
            >
              Start Work
            </Button>
          </View>
          <View>
            <View style={{ alignItems: "center", padding: 15 }}>
              <Text
                style={
                  ([styles.workstartedbtn],
                  { display: workStarted ? "flex" : "none" })
                }
              >
                Work Started at {new Date().getHours()} :
                {new Date().getMinutes()}
              </Text>
            </View>
          </View>
          <View
            style={
              ([styles.workcompbtn], { display: workStarted ? "flex" : "none" })
            }
          >
            <Button
              onPress={() => onWorkCompleted()}
              raised
              mode="contained"
              style={{
                backgroundColor: "green",
                width: "50%",
                alignSelf: "center",
              }}
            >
              Work Completed
            </Button>
          </View>
        </ScrollView>
      </View>
      <Provider>
        <View>
          <Portal>
            <Dialog
              visible={isDialogVisible}
              onDismiss={() => setIsDialogVisible(false)}
            >
              <Dialog.Title>Enter the reason for Rejection</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  // value={"Type here"}
                  onChangeText={(text) => setRejreason(text)}
                  style={{ backgroundColor: "rgb(255,255,255)" }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => onSend()}>Send</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
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
  title: {
    fontSize: 30,
    paddingTop: 30,
    paddingLeft: 15,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  dtlsCon: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    width: "95%",
    marginTop: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 16,
  },
  qa: {
    fontSize: 18,
    backgroundColor: "#c2c2c2",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  aq: {
    fontSize: 18,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  startworkbtn: { padding: 25 },
  workcompbtn: { padding: 25 },
  workstartedbtn: { alignSelf: "center", fontSize: 15 },
});
