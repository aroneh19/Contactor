import React, { useState } from "react";
import {SafeAreaView, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import Header from "../components/Header";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";
import {filterContacts} from "../services/Searching";
import {ContactDetailView} from "./ContactDetailView";
import {useNavigation} from "@react-navigation/native";

const ContactView = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');

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
			<Header />
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<FlatList
				data={filteredContacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.cardWrapper}
						onPress={() => navigation.navigate('ContactDetailView', { name: item.name, phone: item.phone })}
					>
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
	}
});

export default ContactView;
