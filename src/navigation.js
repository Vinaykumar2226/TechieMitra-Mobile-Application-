import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
//import { Loginpage } from './src/Loginpage';
import { Login_or_Signin } from "../src/Login_or_Signin";
//import {BackgroundImage} from './src/BackgroundImage';
import { TotalLoginBackground } from "../src/TotalLoginBackground";
import { Loginpagef } from "../src/LoginPagef";
import { CustomerLogin } from "../src/CustomerLogin";
import { CustomerSignin } from "../src/CustomerSignin";

import { CustomerDashboard } from "../src/CustomerDashboard";
import { Onboarding } from "../src/Onboarding";
import { SPsforAppliance } from "../src/SP'sforAppliance";
import { SpProfile } from "../src/SP_Profile";
import { CustomerDetails } from "../src/Customerdetails";
import { ServiceReqcmp } from "../src/ServiceReqcmp";
import CustomerLoginParent from "../parent/customerloginParent";
import Database from "./database_retrive";
import { Auth } from "../userauth/loginauth";
import { CustomerHistory } from "./CustomerHistory";
import { CustomerHistoryDetails } from "./CustomerHistoryDetails";
// Navigation
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Technicians Flow

import { Tech_Dashboard } from "./Technicians_Flow/Tech_Dashboard";
import { Tech_SerReq } from "./Technicians_Flow/Tech_SerReq";
import { Tech_SerDtls } from "./Technicians_Flow/Tech_SerDtls";
import { Tech_Dtls } from "./Technicians_Flow/Tech_Dtls";
import { Tech_Bill } from "./Technicians_Flow/Tech_Bill";
import { Tech_login } from "./Tech_login";
import { Tech_Auth } from "./Tech_Auth";
import { Tech_History } from "./Technicians_Flow/Tech_History";
import { History_details } from "./Technicians_Flow/History_details";
const Stack = createStackNavigator();

export default function NavigationPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" detachInactiveScreens>
        <Stack.Screen
          name="Tech_Bill"
          component={Tech_Bill}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerHistoryDetails"
          component={CustomerHistoryDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CustomerHistory"
          component={CustomerHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History_details"
          component={History_details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech_History"
          component={Tech_History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loginpagef"
          component={Loginpagef}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech_Dtls"
          component={Tech_Dtls}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tech_Auth"
          component={Tech_Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login_or_Signin"
          component={Login_or_Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerSignin"
          component={CustomerSignin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech_login"
          component={Tech_login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerDashboard"
          component={CustomerDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SPsforAppliance"
          component={SPsforAppliance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpProfile"
          component={SpProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ServiceReqcmp"
          component={ServiceReqcmp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Database"
          component={Database}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech_SerReq"
          component={Tech_SerReq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech_Dashboard"
          component={Tech_Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tech_SerDtls"
          component={Tech_SerDtls}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
