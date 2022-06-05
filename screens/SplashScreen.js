import React from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import SplashSVG from "../svg/SplashSVG";
const SplashScreen = () => {
  const navigation = useNavigation();
  const handleStart = () => {
    navigation.replace("Register");
  };
  return (
    <View style={styles.container}>
      <View>
        <SplashSVG />
      </View>
      <Text style={styles.splashText}>Manage your TODO With</Text>
      <MaskedView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
        maskElement={<Text style={styles.timebuddy}>TimeBuddy</Text>}
      >
        <LinearGradient
          colors={["#C4F566", "rgba(0, 0, 0, 0.3)"]}
          style={{ height: 45, width: 170 }}
        />
      </MaskedView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleStart} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 36,
    color: "rgba(0, 0, 0, 0.5)",
  },
  timebuddy: {
    fontWeight: "800",
    fontSize: 32,
    lineHeight: 48,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#5FD3EDA6",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
