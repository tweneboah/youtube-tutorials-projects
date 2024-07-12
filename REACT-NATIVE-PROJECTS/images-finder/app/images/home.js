import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import MasonryList from "@react-native-seoul/masonry-list";
import FilterSheet from "../components/FilterSheet";
import CategoryList from "../components/CategoryList";
import SearchBar from "../components/SearchBar";

const PIXABAY_API_KEY = "29568989-ca007dc1c1d396d220710a1c6";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState({
    imageType: "all",
    orientation: "all",
    color: "",
    order: "popular",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleApplyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
          term
        )}&image_type=${filters.imageType}&orientation=${
          filters.orientation
        }&colors=${filters.color}&order=${filters.order}&page=1&per_page=50`
      );
      setSearchResults(response.data.hits);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearch("car");
  }, [filters]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    handleSearch(category);
  };

  useEffect(() => {
    if (selectedCategory) {
      handleSearch(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={handleSearch} />
      <CategoryList onSelectCategory={handleSelectCategory} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Stack.Screen
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={handleOpenModal}>
                <Ionicons name="filter-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />

        {loading ? (
          <ActivityIndicator color="red" size="large" />
        ) : (
          <MasonryList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.webformatURL }}
                  style={styles.image}
                />
              </View>
            )}
            onEndReachedThreshold={0.1}
          />
        )}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <FilterSheet
              closeSheet={handleCloseModal}
              applyFilters={handleApplyFilters}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  imageContainer: {
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  imageTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
