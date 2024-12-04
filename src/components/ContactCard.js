import React, { useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
	Image,
} from "react-native"; // Add Image import here
import { useNavigation } from "@react-navigation/native";

const ContactCard = ({ name, phone, photo }) => {
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

	return (
		<Animated.View
			style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
			<View
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				style={styles.cardContent}>
				{photo ? (
					<Image source={{ uri: photo }} style={styles.image} />
				) : (
					<View style={styles.imagePlaceholder} />
				)}
				<Text style={styles.name}>{name}</Text>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: 140,
    height: 115,
    backgroundColor: "#D84343",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  phone: {
    fontSize: 14,
    color: "#CCCCCC",
    textAlign: "center",
  },
});

export default ContactCard;
