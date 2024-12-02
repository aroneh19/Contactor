import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ContactCard = ({ name, phone }) => {
  const navigation = useNavigation();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Slightly reduce the size
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Return to original size
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate("ContactDetailView", { name, phone });
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <View style={styles.imagePlaceholder}>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#24252A", // Match card background to Figma
    borderRadius: 18, // Rounded corners
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 8,
    marginBottom: 16,
    flex: 1,
    maxWidth: "47%", // Two cards in one row
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 15,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: 150, // Match placeholder size in Figma
    height: 115,
    backgroundColor: "#D84343", // Figma's red
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 16, // Match font size in Figma
    fontWeight: "600",
    color: "#FFFFFF", // White text
    textAlign: "center",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: "#CCCCCC", // Subdued gray text
    textAlign: "center",
  },
});

export default ContactCard;
