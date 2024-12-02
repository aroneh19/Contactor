import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddContactModal from '../components/AddContactModal';

const Header = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleAddContact = (name, phone) => {
        // Handle adding the contact (e.g., save to a list or backend)
        console.log(`Contact added: ${name}, ${phone}`);
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Contacts</Text>
            <TouchableOpacity style={styles.addButton} onPress={openModal}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
            <AddContactModal
                visible={isModalVisible}
                onClose={closeModal}
                onSubmit={handleAddContact}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#333',
        borderRadius: 16,
        padding: 8,
    },
});

export default Header;
