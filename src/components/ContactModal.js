import React from "react";
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
	const [name, setName] = React.useState(initialName);
	const [phone, setPhone] = React.useState(initialPhone);
	const [photo, setPhoto] = React.useState(initialPhoto);

	React.useEffect(() => {
		setName(initialName);
		setPhone(initialPhone);
		setPhoto(initialPhoto);
	}, [initialName, initialPhone, initialPhoto]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaType.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setPhoto(result.uri); // Set the selected photo URI
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

					{/* Display the current photo or a placeholder */}
					{photo ? (
						<Image source={{ uri: photo }} style={styles.image} />
					) : (
						<View style={styles.imagePlaceholder}>
							<Text style={styles.imagePlaceholderText}>No Image</Text>
						</View>
					)}

					{/* Button to pick an image */}
					<TouchableOpacity
						style={styles.imagePickerButton}
						onPress={pickImage}>
						<Text style={styles.imagePickerButtonText}>Pick an Image</Text>
					</TouchableOpacity>

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
					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => {
							onSubmit(name, phone);
							onClose();
						}}>
						<Text style={styles.submitButtonText}>{submitButtonText}</Text>
					</TouchableOpacity>

					{/* Delete button */}
					{contactId && (
						<TouchableOpacity
							style={styles.deleteButton}
							onPress={() => {
								onDelete(contactId); // Call onDelete when pressed
								onClose();
							}}>
							<Text style={styles.deleteButtonText}>Delete</Text>
						</TouchableOpacity>
					)}

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
	deleteButton: {
		marginTop: 10,
		backgroundColor: "#e74c3c", // Red background for delete button
		padding: 10,
		borderRadius: 10,
		width: "100%",
		alignItems: "center",
	},
	deleteButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default ContactModal;
