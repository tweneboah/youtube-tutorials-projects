import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";

const Welcome = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://cdn.pixabay.com/photo/2022/09/15/06/14/pattern-7455773_1280.png",
      }}
      style={styles.background}
    >
      <BlurView intensity={50} style={styles.blurContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Masync Photo App</Text>
          <Text style={styles.subtitle}>Search for images of your choice</Text>
          <Pressable style={styles.button}>
            <Link href="/images/home" style={styles.link}>
              <Text style={styles.buttonText}>Start Searching</Text>
            </Link>
          </Pressable>
        </View>
      </BlurView>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(0, 0, 255, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  link: {
    textDecorationLine: "none",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
