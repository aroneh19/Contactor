import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Alert,
	ActivityIndicator,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContactModal from "../components/ContactModal";

const ContactDetailView = ({ route }) => {
	const { name, phone, photo } = route.params; // Correctly access name and phone
	const [modalVisible, setModalVisible] = useState(false);
	const [canMakeCall, setCanMakeCall] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const phoneUrl = `tel:${phone}`;
		Linking.canOpenURL(phoneUrl)
			.then((supported) => {
				setCanMakeCall(supported);
			})
			.catch((err) => console.error("An error occurred", err));
	}, [phone]);

	const makeCall = () => {
		setLoading(true);
		let phoneUrl = `tel:${phone}`;
		if (canMakeCall) {
			Linking.openURL(phoneUrl)
				.then(() => setLoading(false))
				.catch((err) => {
					console.error("An error occurred", err);
					setLoading(false);
				});
		} else {
			Alert.alert("Error", "Unable to make a call");
			setLoading(false);
		}
	};

	const handleDeleteContact = async (contactId) => {
		// Use your `removeContact` function to delete the contact
		await removeContact(contactId);
		// Optionally, refresh the contact list or handle the UI after deletion
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerIcons}>
				<TouchableOpacity style={styles.iconButton} onPress={makeCall}>
					<Ionicons name="call-outline" size={24} color="black" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => setModalVisible(true)}>
					<Ionicons name="create-outline" size={24} color="black" />
				</TouchableOpacity>
			</View>
			{loading && <ActivityIndicator size="small" color="#ffcc00" />}
			<View style={styles.centeredContent}>
				<View style={styles.cardContainer}>
					{photo ? (
						<Image source={{ uri: photo }} style={styles.image} />
					) : (
						<View style={styles.imagePlaceholder} />
					)}
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.phone}>{phone}</Text>
				</View>
			</View>
			<ContactModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				title="Edit Contact"
				initialPhoto={photo}
				initialName={name}
				initialPhone={phone}
				onSubmit={(updatedName, updatedPhone, updatedPhoto) => {
					// Handle contact update logic here
					updateContact(updatedName, updatedPhone, updatedPhoto);
					setModalVisible(false);
				}}
				submitButtonText="Save Changes"
				onDelete={handleDeleteContact}
				contactId={contact.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a1a1a",
		padding: 20,
	},
	headerIcons: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		marginBottom: 20,
	},
	iconButton: {
		backgroundColor: "#ffcc00",
		borderRadius: 50,
		padding: 10,
		marginHorizontal: 8,
	},
	centeredContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardContainer: {
		backgroundColor: "#333333",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	imagePlaceholder: {
		width: 120,
		height: 120,
		backgroundColor: "#cc4444",
		borderRadius: 12,
		marginBottom: 16,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 8,
	},
	phone: {
		fontSize: 18,
		color: "#ccc",
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 12,
		marginBottom: 16,
		resizeMode: "cover",
	},
});

export default ContactDetailView;
