import React, { useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";
import { filterContacts } from "../services/Searching";
import { useNavigation } from "@react-navigation/native";

const ContactView = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");

	const contacts = [
		{ id: "1", name: "John Doe", phone: "123-456-7890" },
		{ id: "2", name: "Jane Smith", phone: "987-654-3210" },
		{ id: "3", name: "Aron Herreros", phone: "6669321" },
		{ id: "4", name: "Chris Brown", phone: "222-333-4444" },
		{ id: "5", name: "Kelly Adams", phone: "111-222-3333" },
	];

	const filteredContacts = filterContacts(contacts, searchQuery);

	return (
		<SafeAreaView style={styles.container}>
			{/* Custom Header */}
			<Header />

			{/* Search Bar */}
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

			{/* Contact List */}
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
						}
					>
						<ContactCard name={item.name} />
					</TouchableOpacity>
				)}
				numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
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
		paddingHorizontal: 12,
		paddingBottom: 16,
	},
	cardWrapper: {
		width: "45%", // Keep the smaller size for the cards
		margin: "2.5%", // Maintain the spacing between cards
		backgroundColor: "#2a2a2a", // Gray box color
		borderRadius: 20, // Increase the border radius here (e.g., 20 for a more rounded look)
		padding: 12,
	},
	columnWrapper: {
		justifyContent: "space-between",
	},
});



export default ContactView;
