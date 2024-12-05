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
import * as ImagePicker from "expo-image-picker";

const AddContactModal = ({ visible, onClose, onAddContact }) => {
	const [name, setName] = useState("");
	const [phone, setphone] = useState("");
	const [photo, setPhoto] = useState(null);

	const [selectedImage, setSelectedImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorVisible, setErrorVisible] = useState(false);

	useEffect(() => {
		if (!visible) {
			setSelectedImage(null);
			setErrorMessage("");
			setErrorVisible(false);
		}
	}, [visible]);

	const handleImageSelection = async (type) => {
		let result;
		try {
			if (type === "camera") {
				result = await ImagePicker.launchCameraAsync({
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});
			} else if (type === "gallery") {
				result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaType,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});
			}

			if (!result.canceled) {
				const selectedUri = result.assets[0].uri;
				setPhoto(selectedUri);
				setSelectedImage(selectedUri);
			}
		} catch (error) {
			console.error("Error selecting image:", error);
			showErrorMessage("Failed to select image. Please try again.");
		}
	};

	const handleAddContact = async () => {
		if (name && phone && photo) {
			try {
				const savedContact = { name, phone, photo };
				onAddContact(savedContact);

				// Reset the form
				setName("");
				setphone("");
				setPhoto(null);
				setSelectedImage(null);

				onClose();
			} catch (error) {
				console.error("Error adding contact:", error);
				showErrorMessage("Failed to add contact. Please try again.");
			}
		} else {
			showErrorMessage("Please fill in all fields.");
		}
	};

	const showErrorMessage = (message) => {
		setErrorMessage(message);
		setErrorVisible(true);
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

					{selectedImage && (
						<Image
							source={{ uri: selectedImage }}
							style={styles.imagePreview}
						/>
					)}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							width: "100%",
						}}>
						<TouchableOpacity
							style={styles.imageButton}
							onPress={() => handleImageSelection("gallery")}>
							<Text style={styles.buttonText}>Upload Photo</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.imageButton}
							onPress={() => handleImageSelection("camera")}>
							<Text style={styles.buttonText}> Take Photo </Text>
						</TouchableOpacity>
					</View>

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

			{/* Error Message Modal */}
			<Modal
				visible={errorVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setErrorVisible(false)}>
				<View style={styles.errorOverlay}>
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{errorMessage}</Text>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setErrorVisible(false)}>
							<Text style={styles.buttonText}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
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
	errorOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	errorContainer: {
		width: "80%",
		padding: 20,
		backgroundColor: "#f8d7da",
		borderRadius: 10,
		alignItems: "center",
	},
	errorText: {
		color: "#721c24",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 15,
	},
});
