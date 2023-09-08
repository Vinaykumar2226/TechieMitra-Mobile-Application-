import React, { useState } from "react";
import { View, Text } from "react-native";

import { CustomerLogin } from "../src/CustomerLogin";
import Database from "../src/database_retrive";

export const Auth = () => {
  const [retdata, setRetdata] = useState();

  // const datasent = (text) => {
  //   setRetdata(text);
  // };

  console.log(retdata, "Hell[p");

  return (
    <View>
      <Text>Hello</Text>
      <Database data={setRetdata} />
      <CustomerLogin value={retdata} />
    </View>
  );
};
