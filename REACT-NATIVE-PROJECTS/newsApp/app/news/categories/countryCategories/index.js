import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AllCountries = () => {
  const countries = [
    { id: "1", name: "United Arab Emirates", code: "ae", icon: "flag" },
    { id: "2", name: "Argentina", code: "ar", icon: "flag" },
    { id: "3", name: "Australia", code: "au", icon: "flag" },
    { id: "4", name: "Belgium", code: "be", icon: "flag" },
    { id: "5", name: "Bulgaria", code: "bg", icon: "flag" },
    { id: "6", name: "Brazil", code: "br", icon: "flag" },
    { id: "7", name: "Canada", code: "ca", icon: "flag" },
    { id: "8", name: "Switzerland", code: "ch", icon: "flag" },
    { id: "9", name: "China", code: "cn", icon: "flag" },
    { id: "10", name: "Colombia", code: "co", icon: "flag" },
    { id: "11", name: "Cuba", code: "cu", icon: "flag" },
    { id: "12", name: "Czech Republic", code: "cz", icon: "flag" },
    { id: "13", name: "Germany", code: "de", icon: "flag" },
    { id: "14", name: "Egypt", code: "eg", icon: "flag" },
    { id: "15", name: "France", code: "fr", icon: "flag" },
    { id: "16", name: "United Kingdom", code: "gb", icon: "flag" },
    { id: "17", name: "Greece", code: "gr", icon: "flag" },
    { id: "18", name: "Hong Kong", code: "hk", icon: "flag" },
    { id: "19", name: "Hungary", code: "hu", icon: "flag" },
    { id: "20", name: "India", code: "in", icon: "flag" },
    { id: "21", name: "Indonesia", code: "id", icon: "flag" },
    { id: "22", name: "Ireland", code: "ie", icon: "flag" },
    { id: "23", name: "Israel", code: "il", icon: "flag" },
    { id: "24", name: "Italy", code: "it", icon: "flag" },
    { id: "25", name: "Japan", code: "jp", icon: "flag" },
    { id: "26", name: "Latvia", code: "lv", icon: "flag" },
  ];

  const router = useRouter();
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <Text style={styles.title}>Countries</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.countryContainer}
              onPress={() =>
                router.push({
                  pathname: `/news/countries`,
                  params: {
                    country: item.code,
                  },
                })
              }
            >
              <MaterialIcons
                name={item.icon}
                size={32}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.countryText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2} // Display two items per row
      />
    </LinearGradient>
  );
};

export default AllCountries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  countryContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    margin: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  icon: {
    marginRight: 8,
  },
  countryText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
