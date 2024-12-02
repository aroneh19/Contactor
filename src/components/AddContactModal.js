import React, { useState, useEffect } from "react";
import {
	Modal,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import {
	requestMediaLibraryPermissionsAsync,
	launchImageLibraryAsync,
	MediaType,
} from "expo-image-picker";
import { saveContact } from "../services/fileManager";

const AddContactModal = ({ visible, onClose, onAddContact }) => {
	const [name, setName] = useState("");
	const [phone, setphone] = useState("");
	const [photo, setPhoto] = useState(null);

	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		if (!visible) {
			setSelectedImage(null);
		}
	}, [visible]);

	const handleSelectImage = async () => {
		const { status } = await requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission required",
				"Camera roll permissions are required to select an image."
			);
			return;
		}

		const result = await launchImageLibraryAsync({
			mediaTypes: MediaType,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			const imageUri = result.assets[0].uri;
			setSelectedImage(imageUri); // Update the state with the selected image URI
			setPhoto(imageUri); // Call the parent handler with the image URI
		}
	};

	const handleAddContact = async () => {
		if (name && phone && photo) {
			try {
				const savedContact = await saveContact(name, phone, photo);

				console.log("Contact saved:", savedContact);

				// Reset the form
				setName("");
				setphone("");
				setPhoto(null);
				setSelectedImage(null);

				// Notify parent component about the new contact
				onAddContact(savedContact);

				onClose(); // Close the modal
			} catch (error) {
				console.error("Error saving contact:", error);
				alert("Failed to save contact. Please try again.");
			}
		} else {
			alert("Please fill in all fields");
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Add Contact</Text>

					{/* Image preview */}
					{selectedImage && (
						<Image
							source={{ uri: selectedImage }}
							style={styles.imagePreview} // Style for the preview
						/>
					)}

					<TouchableOpacity
						style={styles.imageButton}
						onPress={handleSelectImage}>
						<Text style={styles.buttonText}>Select Image</Text>
					</TouchableOpacity>

					<TextInput
						style={styles.input}
						placeholder="Name"
						value={name}
						onChangeText={setName}
					/>
					<TextInput
						style={styles.input}
						placeholder="Phone Number"
						keyboardType="phone-pad"
						value={phone}
						onChangeText={setphone}
					/>

					<TouchableOpacity onPress={handleAddContact} style={styles.addButton}>
						<Text style={styles.buttonText}>Add Contact</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<Text style={styles.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default AddContactModal;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		width: "85%",
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 20,
	},
	imageButton: {
		backgroundColor: "#1a73e8",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 15,
	},
	imagePreview: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "#ddd",
		marginBottom: 15,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 20,
		fontSize: 16,
	},
	addButton: {
		backgroundColor: "#28a745",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 10,
		marginBottom: 10,
	},
	closeButton: {
		backgroundColor: "#dc3545",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});
