import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";

const TabHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Authentication</Text>
      <Text style={styles.subtitle}>Technologies used:</Text>
      <View style={styles.techList}>
        <LinearGradient colors={["#61DBFB", "#35AFC2"]} style={styles.techItem}>
          <Icon name="code" size={30} color="#fff" />
          <Text style={styles.techText}>React Native</Text>
        </LinearGradient>
        <LinearGradient colors={["#764ABC", "#543B9A"]} style={styles.techItem}>
          <Fontisto name="redux" size={30} color="#fff" />
          <Text style={styles.techText}>Redux</Text>
        </LinearGradient>
        <LinearGradient colors={["#FF4154", "#D12B3A"]} style={styles.techItem}>
          <Icon name="database" size={30} color="#fff" />
          <Text style={styles.techText}>Tanstack Query</Text>
        </LinearGradient>
        <LinearGradient colors={["#0FAAFF", "#0B79C1"]} style={styles.techItem}>
          <Icon name="wpforms" size={30} color="#fff" />
          <Text style={styles.techText}>Formik</Text>
        </LinearGradient>
        <LinearGradient colors={["#000000", "#434343"]} style={styles.techItem}>
          <Icon name="server" size={30} color="#fff" />
          <Text style={styles.techText}>NodeJS API</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  techList: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  techItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  techText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
