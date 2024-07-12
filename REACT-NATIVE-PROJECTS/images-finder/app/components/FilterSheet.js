import React, { useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const imageTypes = ["all", "photo", "illustration", "vector"];
const orientations = ["all", "horizontal", "vertical"];
const colors = [
  "grayscale",
  "transparent",
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "lilac",
  "pink",
  "white",
  "gray",
  "black",
  "brown",
];
const orders = ["popular", "latest"];

const FilterOption = ({ label, options, selectedOption, onSelect }) => {
  return (
    <View style={styles.filterOptionContainer}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function FilterSheet({ closeSheet, applyFilters }) {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [selectedImageType, setSelectedImageType] = useState("all");
  const [selectedOrientation, setSelectedOrientation] = useState("all");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("popular");

  const handleApplyFilters = () => {
    applyFilters({
      imageType: selectedImageType,
      orientation: selectedOrientation,
      color: selectedColor,
      order: selectedOrder,
    });
    closeSheet();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={(index) => {
        if (index === 0) {
          closeSheet();
        }
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Filter Options</Text>

        <FilterOption
          label="Image Type"
          options={imageTypes}
          selectedOption={selectedImageType}
          onSelect={setSelectedImageType}
        />

        <FilterOption
          label="Orientation"
          options={orientations}
          selectedOption={selectedOrientation}
          onSelect={setSelectedOrientation}
        />

        <FilterOption
          label="Color"
          options={["any", ...colors]}
          selectedOption={selectedColor}
          onSelect={(value) => setSelectedColor(value === "any" ? "" : value)}
        />

        <FilterOption
          label="Order"
          options={orders}
          selectedOption={selectedOrder}
          onSelect={setSelectedOrder}
        />

        <Button title="Apply Filters" onPress={handleApplyFilters} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  filterOptionContainer: {
    marginVertical: 10,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  selectedOptionButton: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
});
