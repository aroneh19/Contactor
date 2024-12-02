import React, { useState } from "react";
import { View, FlatList } from "react-native";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import ContactCard from "../components/ContactCard"; // Import the ContactCard component
import AddButton from "../components/AddButton"; // Import the AddButton component
import styles from "../styles/HomeViewStyles"; // Import the styles

export default function HomeView({ contacts, navigation }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Filter contacts based on the search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Contact List in a Grid */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id} // Unique key for each item
        numColumns={2} // Number of columns in the grid
        renderItem={({ item }) => <ContactCard contact={item} />} // Render ContactCard
        contentContainerStyle={styles.gridContainer} // Apply grid styles
      />

      {/* Floating Add Button */}
      <AddButton onPress={() => navigation.navigate("Edit", { mode: "add" })} />
    </View>
  );
}
