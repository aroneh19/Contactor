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
import * as fileManager from "../services/fileManager";
import * as Contacts from "expo-contacts";
import { useContacts } from "../Context/AppContext";

const ContactDetailView = ({ route, navigation }) => {
	const { contacts, setContacts } = useContacts();
	const { name, phone, photo, contact, fileName, source } = route.params;
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

	const handleUpdateContact = async (updatedName, updatedPhone, updatedPhoto) => {
		try {
			if (source === "file") {
				const photoToSave = updatedPhoto || photo;
				await fileManager.removeContact(fileName);
				const newFileName = `${updatedName}-${contact}.json`;
				await fileManager.saveContact(updatedName, updatedPhone, photoToSave);
			} else if (source === "device") {
				const existingContact = await Contacts.getContactByIdAsync(contact);
				if (!existingContact) {
					Alert.alert("Error", "Contact not found.");
					return;
				}

				const [firstName, ...lastNameParts] = updatedName.split(" ");
				const lastName = lastNameParts.join(" ");
				const photoToUpdate = updatedPhoto || existingContact.image?.uri || null;

				const updatedContact = {
					...existingContact,
					firstName: firstName || existingContact.firstName,
					lastName: lastName || existingContact.lastName,
					phoneNumbers: [{ number: updatedPhone }],
					image: photoToUpdate ? { uri: photoToUpdate } : null,
				};

				await Contacts.updateContactAsync(updatedContact);
			}

			// Update contacts in context
			setContacts((prevContacts) =>
				prevContacts.map((c) =>
					c.id === contact
						? { ...c, name: updatedName, phone: updatedPhone, photo: updatedPhoto || photo }
						: c
				)
			);

			Alert.alert("Success", "Contact updated successfully.");
			navigation.goBack();
		} catch (error) {
			console.error("Error updating contact:", error);
			Alert.alert("Invalid phone number", "Must start with 6 or higher, contain only digits, and be 7 digits long");
		}
	};

	const handleDeleteContact = async (contactId) => {
		try {
			if (source === "file") {
				await fileManager.removeContact(fileName);
			} else if (source === "device") {
				await Contacts.removeContactAsync(contactId);
			}
			Alert.alert("Success", "Contact deleted successfully.");
			navigation.goBack();
		} catch (error) {
			console.error("Failed to delete contact:", error);
			Alert.alert("Error", "Failed to delete contact.");
		}
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
						<Image
							source={{ uri: photo }} style={styles.image}
						/>
					) : (
						<View style={styles.imagePlaceholder}>
							<Text style={styles.imagePlaceholderText}>No Image</Text>
						</View>
					)}
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.phone}>{phone}</Text>
				</View>
			</View>
			{/* Delete Button in View */}
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() => {
					Alert.alert(
						"Delete Contact",
						`Are you sure you want to delete ${name}?`,
						[
							{ text: "Cancel", style: "cancel" },
							{
								text: "Delete",
								style: "destructive",
								onPress: async () => await handleDeleteContact(contact),
							},
						]
					);
				}}>
				<Text style={styles.deleteButtonText}>Delete Contact</Text>
			</TouchableOpacity>
			<ContactModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				title="Edit Contact"
				initialPhoto={photo}
				initialName={name}
				initialPhone={phone}
				onSubmit={(updatedName, updatedPhone, updatedPhoto) => {
					handleUpdateContact(updatedName, updatedPhone, updatedPhoto);
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
	image: {
		width: 120,
		height: 120,
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
	deleteButton: {
		marginTop: 20,
		backgroundColor: "#e74c3c",
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

export default ContactDetailView;
