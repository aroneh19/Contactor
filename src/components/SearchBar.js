import React from "react";
import { View, TextInput, Image } from "react-native";
import styles from "../styles/HomeViewStyles";
import searchIcon from "../../assets/Group.png"; // Import the PNG file

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.searchBar}>
      <Image source={searchIcon} style={styles.searchIcon} /> {/* Use the imported PNG */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#777777"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
