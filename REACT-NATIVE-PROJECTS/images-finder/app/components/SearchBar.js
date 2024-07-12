import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    onSearch(searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
});

export default SearchBar;
