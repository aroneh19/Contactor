import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	Alert,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContactModal from "../components/ContactModal";
import * as fileManager from "../services/fileManager";
import * as Contacts from "expo-contacts";

const ContactDetailView = ({ route, navigation }) => {
	const { name, phone, photo } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const [canMakeCall, setCanMakeCall] = useState(false);

	useEffect(() => {
		const phoneUrl = `tel:${phone}`;
		Linking.canOpenURL(phoneUrl)
			.then((supported) => {
				setCanMakeCall(supported);
			})
			.catch((err) => console.error("An error occurred", err));
	}, [phone]);

	const makeCall = () => {
		if (canMakeCall) {
			Linking.openURL(`tel:${phone}`).catch((err) =>
				console.error("An error occurred", err)
			);
		} else {
			Alert.alert("Error", "Unable to make a call");
		}
	};

	return (
		<View style={styles.container}>
			{/* Custom Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="arrow-back-outline" size={24} color="#fff" />
				</TouchableOpacity>
				<View style={styles.headerIcons}>
					<TouchableOpacity style={styles.iconButton} onPress={makeCall}>
						<Ionicons name="call-outline" size={20} color="black" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={() => setModalVisible(true)}
					>
						<Ionicons name="create-outline" size={20} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			{/* Contact Card */}
			<View style={styles.centeredContent}>
				<View style={styles.cardContainer}>
					{photo ? (
						<Image source={{ uri: photo }} style={styles.image} />
					) : (
						<View style={styles.imagePlaceholder}>
							<Text style={styles.imagePlaceholderText}>Image</Text>
						</View>
					)}
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.phone}>{phone}</Text>
				</View>
			</View>

			{/* Modal */}
			<ContactModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				title="Edit Contact"
				initialName={name}
				initialPhone={phone}
				onSubmit={(updatedName, updatedPhone) => {
					console.log("Updated Contact:", updatedName, updatedPhone);
					setModalVisible(false);
				}}
				submitButtonText="Save Changes"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a1a1a",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		paddingTop: 48,
	},
	backButton: {
		padding: 8,
	},
	headerIcons: {
		flexDirection: "row",
	},
	iconButton: {
		backgroundColor: "#ffcc00",
		borderRadius: 20,
		padding: 8,
		marginHorizontal: 4,
	},
	centeredContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	cardContainer: {
		backgroundColor: "#292929",
		borderRadius: 20,
		padding: 16,
		alignItems: "center",
	},
	imagePlaceholder: {
		width: 120,
		height: 120,
		backgroundColor: "#D84343",
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	imagePlaceholderText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 16,
		marginBottom: 16,
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
		textAlign: "center",
	},
	phone: {
		fontSize: 16,
		color: "#ccc",
		textAlign: "center",
	},
});

export default ContactDetailView;
