import React, { useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Image,
} from "react-native"; // Add Image import here

const ContactCard = ({ name, photo }) => {
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
	card: {
		backgroundColor: "#292929",
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		margin: 8,
		flex: 1,
		maxWidth: "47%",
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginBottom: 12,
	},
	imagePlaceholder: {
		width: 80,
		height: 80,
		backgroundColor: "#cc4444",
		borderRadius: 8,
		marginBottom: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
	},
	phone: {
		fontSize: 14,
		color: "#ccc",
	},
});

export default ContactCard;
