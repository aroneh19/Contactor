import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddContactModal from "../components/AddContactModal";

const Header = ({ onAddContact }) => {
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	return (
		<View style={styles.header}>
			<Text style={styles.title}>Contacts</Text>
			<TouchableOpacity style={styles.addButton} onPress={toggleModal}>
				<Ionicons name="add" size={24} color="#fff" />
			</TouchableOpacity>

			<AddContactModal
				visible={isModalVisible}
				onClose={toggleModal}
				onAddContact={onAddContact}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1a1a1a',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#333',
        borderRadius: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#fdfdfdfd',
    },
});

export default Header;
