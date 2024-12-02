import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";
import { filterContacts } from "../services/Searching";
import { ContactDetailView } from "./ContactDetailView";
import { useNavigation } from "@react-navigation/native";
import { getAllContacts } from "../services/fileManager"; // Import getAllContacts function

const ContactView = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");
	const [contacts, setContacts] = useState([]); // State to hold contacts

	// Fetch contacts when the component mounts
	useEffect(() => {
		const loadContacts = async () => {
			try {
				const allContacts = await getAllContacts(); // Get contacts from FileSystem
				setContacts(allContacts); // Set the contacts state
			} catch (error) {
				console.error("Failed to load contacts", error);
			}
		};

		loadContacts();
	}, []);

	const filteredContacts = filterContacts(contacts, searchQuery);

	return (
		<SafeAreaView style={styles.container}>
			<Header />
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<FlatList
				data={filteredContacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.cardWrapper}
						onPress={() =>
							navigation.navigate("ContactDetailView", {
								name: item.name,
								phone: item.phone,
							})
						}>
						<ContactCard name={item.name} />
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
