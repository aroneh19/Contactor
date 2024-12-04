import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Modal,
	Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ContactModal = ({
	visible,
	onClose,
	title,
	initialName = "",
	initialPhone = "",
	initialPhoto = null,
	onSubmit,
	submitButtonText,
	onDelete,
	contactId,
}) => {
	const [name, setName] = useState(initialName);
	const [phone, setPhone] = useState(initialPhone);
	const [photo, setPhoto] = useState(initialPhoto);

	// Sync initial values when modal opens
	useEffect(() => {
		setName(initialName);
		setPhone(initialPhone);
		setPhoto(initialPhoto);
	}, [initialName, initialPhone, initialPhoto]);

	// Function to open camera or gallery
	const handleImageSelection = async (type) => {
		let result;
		if (type === "camera") {
			result = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
		} else if (type === "gallery") {
			result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaType.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
		}

		if (!result.canceled) {
			setPhoto(result.assets[0].uri); // Update photo state with selected image
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>{title}</Text>

					{/* Display current photo or placeholder */}
					{photo ? (
						<Image source={{ uri: photo }} style={styles.image} />
					) : (
						<View style={styles.imagePlaceholder}>
							<Text style={styles.imagePlaceholderText}>No Image</Text>
						</View>
					)}

					{/* Button to add or change the photo */}
					<View style={styles.imageButtonsContainer}>
						<TouchableOpacity
							style={styles.imagePickerButton}
							onPress={() => handleImageSelection("gallery")}>
							<Text style={styles.imagePickerButtonText}>Upload Photo</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.imagePickerButton}
							onPress={() => handleImageSelection("camera")}>
							<Text style={styles.imagePickerButtonText}>Take Photo</Text>
						</TouchableOpacity>
					</View>

					{/* Input fields for name and phone */}
					<TextInput
						style={styles.input}
						placeholder="Name"
						placeholderTextColor="#ccc"
						value={name}
						onChangeText={setName}
					/>
					<TextInput
						style={styles.input}
						placeholder="Phone Number"
						placeholderTextColor="#ccc"
						value={phone}
						onChangeText={setPhone}
						keyboardType="phone-pad"
					/>

					{/* Submit button */}
					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => {
							onSubmit(name, phone, photo); // Pass photo as well
							onClose();
						}}>
						<Text style={styles.submitButtonText}>{submitButtonText}</Text>
					</TouchableOpacity>
					{/* Close button */}
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContainer: {
		width: 300,
		backgroundColor: "#333333",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
	},
	input: {
		width: "100%",
		backgroundColor: "#444",
		borderRadius: 10,
		padding: 10,
		color: "#fff",
		marginBottom: 10,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 12,
		marginBottom: 16,
	},
	imagePlaceholder: {
		width: 120,
		height: 120,
		backgroundColor: "#ccc",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	imagePlaceholderText: {
		color: "#666",
		fontSize: 14,
	},
	imagePickerButton: {
		backgroundColor: "#ffcc00",
		padding: 10,
		borderRadius: 10,
		marginBottom: 16,
	},
	imagePickerButtonText: {
		color: "#000",
		fontWeight: "bold",
	},
	imageButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 16,
	},
	submitButton: {
		marginTop: 10,
		backgroundColor: "#ffcc00",
		padding: 10,
		borderRadius: 10,
		width: "100%",
		alignItems: "center",
	},
	submitButtonText: {
		color: "#000",
		fontWeight: "bold",
	},
	closeButton: {
		marginTop: 10,
		backgroundColor: "#999",
		padding: 10,
		borderRadius: 10,
		width: "100%",
		alignItems: "center",
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default ContactModal;
