import React, { useState, Fragment } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import AddSVG from "../svg/AddSVG";
import CalendarSVG from "../svg/CalendarSVG";
import Tasks from "../components/Tasks";
import MyCalendar from "../components/MyCalendar";
import HomeSVG from "../svg/HomeSVG";
import AddTodo from "../components/AddTodo";
import { AntDesign } from "@expo/vector-icons";

const auth = getAuth();

const Dashboard = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView  style={styles.container} behaviour="padding">
        <View style={styles.profile}>
          <View style={styles.logOutContainer}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logOutButton}
            >
              <Text style={styles.logOutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.user}>
            <Image
              style={styles.profilePic}
              source={{
                uri: "https://source.unsplash.com/random/?profile,displayPicture",
              }}
            />
            <View style={styles.welcomeMessage}>
              <Text style={styles.welcomeText}>
                Welcome {auth.currentUser?.displayName ?? "user"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.navigationButtonsContainer}>
          {openCalendar && (
            <TouchableOpacity
              style={styles.homeIconContainer}
              onPress={() => setOpenCalendar(false)}
            >
              <HomeSVG />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.replace("Doing")}
            style={styles.navigationButton}
          >
            <Text style={styles.navigationButtonText}>Doing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace("Done")}
            style={styles.navigationButton}
          >
            <Text style={styles.navigationButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navContainer}>
          {openCalendar ? (
            <Fragment>
              <TouchableOpacity onPress={() => setOpenCalendar(false)}>
                <Text style={styles.calendarText}>To Do</Text>
              </TouchableOpacity>
              <Text style={styles.navText}>Calendar</Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text style={styles.navText}>Tasks Today</Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenCalendar(true);
                  setOpenInput(false);
                }}
              >
                <CalendarSVG />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
        {!openCalendar && (
          <View style={styles.addIcon}>
            <TouchableOpacity
              style={{ marginBottom: 10 }}
              onPress={() => setOpenInput(!openInput)}
            >
              {!openInput ? (
                <AddSVG />
              ) : (
                <AntDesign name="closecircle" size={24} color="black" />
              )}
            </TouchableOpacity>
            {openInput && (
              <Fragment>
                <AddTodo closeForm={(value) => setOpenInput(value)} />
              </Fragment>
            )}
          </View>
        )}
        {openCalendar ? (
          <View style={styles.calendarContainer}>
            <MyCalendar />
          </View>
        ) : (
          <Tasks />
        )}
    </KeyboardAvoidingView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    position: "relative",
    alignItems: "center",
    width: "95%",
    height: 206,
    backgroundColor: "#C4F566",
    borderRadius: 20,
    top: 30,
    marginBottom: 35,
  },
  logOutContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    top: "10%",
  },
  logOutButton: {
    backgroundColor: "#EAC8C8",
    borderRadius: 20,
    width: 72,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logOutButtonText: {
    fontWeight: "400",
    fontSize: 13,
    color: "#33966C",
  },
  user: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 147,
    height: 141,
    borderRadius: 100,
    backgroundColor: "white",
    marginTop: 6,
  },
  welcomeMessage: {
    width: 213,
    height: 29,
    borderRadius: 100,
    backgroundColor: "#EAC8C8",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontWeight: "400",
    fontSize: 13,
    color: "black",
  },
  navigationButtonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  navigationButton: {
    backgroundColor: "#EAC8C8",
    width: 73,
    height: 29,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationButtonText: {
    fontWeight: "800",
    fontSize: 18,
    lineHeight: 27,
    color: "#33966C",
  },
  button: {
    backgroundColor: "rgba(95, 211, 237, 0.65)",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  navContainer: {
    backgroundColor: "#EAC8C8",
    width: "95%",
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 4,
    alignItems: "center",
    height: 40,
  },
  navText: {
    fontSize: 18,
    fontWeight: "800",
  },
  addIcon: {
    width: "95%",
    justifyContent: "center",
    marginTop: 20,
  },
  calendarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#33966C",
  },
  homeIconContainer: {
    backgroundColor: "#EAC8C8",
    width: 52,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  calendarContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
