import React, { useState, useEffect } from "react";
import {
	Text,
	SafeAreaView,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";
import { filterContacts } from "../services/Searching";
import { useNavigation } from "@react-navigation/native";
import * as fileManager from "../services/fileManager"; // Import getAllContacts function
import * as Contacts from "expo-contacts";

const ContactView = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");

	const [contacts, setContacts] = useState([]);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [photo, setPhoto] = useState(null);

	const filteredContacts = filterContacts(contacts, searchQuery);

	const loadContacts = async () => {
		const allContactsFromFile = await fileManager.getAllContacts();

		// Fetch contacts from the device address book
		const deviceContacts = await getDeviceContacts();

		// Combine both sets of contacts
		const allContacts = [...allContactsFromFile, ...deviceContacts];

		// Sort the contacts by name
		const sortedContacts = sortContacts(allContacts);

		setContacts(sortedContacts);
	};

	// Function to get contacts from the device
	const getDeviceContacts = async () => {
		const { status } = await Contacts.requestPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission required",
				"You need to grant permission to access contacts."
			);
			return [];
		}

		const { data } = await Contacts.getContactsAsync({
			fields: [
				Contacts.Fields.Name,
				Contacts.Fields.PhoneNumbers,
				Contacts.Fields.Image,
			],
		});

		// Format the device contacts to match your file system format
		return data.map((contact) => ({
			id: contact.id, // You can use the device-generated ID or generate your own
			name: contact.name,
			phone: contact.phoneNumbers ? contact.phoneNumbers[0].number : "",
			photo: contact.image ? contact.image.uri : null, // If image exists
		}));
	};

	const sortContacts = (contacts) => {
		return contacts.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
	  };

	const handleAddContact = async () => {
		if (!name || !phone) {
			Alert.alert("Error", "Name and phone are required.");
			return;
		}
		await fileManager.saveContact(name, phone, photo || "");
		setName("");
		setPhone("");
		setPhoto("");
		await loadContacts();
	};

	const handleRemoveContact = async (fileName) => {
		await fileManager.removeContact(fileName);
		await loadContacts();
	};

	const handleClearContacts = async () => {
		Alert.alert("Confirm", "Are you sure you want to delete all contacts?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					await fileManager.cleanDirectory();
					await loadContacts();
				},
			},
		]);
	};

	useEffect(() => {
		loadContacts();
	}, [contacts]);

	return (
		<SafeAreaView style={styles.container}>
			<Header onAddContact={handleAddContact} />
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<FlatList
				data={filteredContacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.cardWrapper}
						activeOpacity={0.8}
						onPress={() =>
							navigation.navigate("ContactDetailView", {
								name: item.name,
								phone: item.phone,
								photo: item.photo,
								contact: item.id,
							})
						}>
						<ContactCard
							name={item.name}
							phone={item.phone}
							photo={item.photo}
						/>
					</TouchableOpacity>
				)}
				numColumns={2}
				contentContainerStyle={styles.list}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a1a1a",
	},
	list: {
		padding: 16,
	},
	cardWrapper: {
		flex: 1,
		margin: 8,
		backgroundColor: "#2a2a2a",
		borderRadius: 10,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ContactView;
