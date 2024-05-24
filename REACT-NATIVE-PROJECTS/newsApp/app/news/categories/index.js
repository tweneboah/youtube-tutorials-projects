import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const AllCategories = () => {
  const categories = [
    { id: "1", name: "Business", icon: "business" },
    { id: "2", name: "Entertainment", icon: "movie" },
    { id: "3", name: "Health", icon: "health-and-safety" },
    { id: "4", name: "Science", icon: "science" },
    { id: "5", name: "Sports", icon: "sports" },
    { id: "6", name: "Technology", icon: "computer" },
    { id: "7", name: "Headlines", icon: "newspaper" },
    { id: "8", name: "Everything", icon: "newspaper" },
    { id: "9", name: "Covid-19", icon: "medical-services" },
    { id: "10", name: "Coronavirus", icon: "medical-services" },
    { id: "11", name: "Finance", icon: "monetization-on" },
    { id: "12", name: "Food", icon: "restaurant" },
    { id: "13", name: "Travel", icon: "flight" },
    { id: "14", name: "Music", icon: "music-note" },
    { id: "15", name: "TV", icon: "tv" },
    { id: "16", name: "Books", icon: "book" },
    { id: "17", name: "Gaming", icon: "videogame-asset" },
    { id: "18", name: "Movies", icon: "movie" },
    { id: "19", name: "News", icon: "newspaper" },
    { id: "20", name: "Pets", icon: "pets" },
    { id: "21", name: "Sports", icon: "sports" },
    { id: "22", name: "Vehicles", icon: "directions-car" },
  ];
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => {
              router.push(`/news/categories/${item.name}`);
            }}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </LinearGradient>
  );
};

export default AllCategories;

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
  categoryContainer: {
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
  categoryText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
