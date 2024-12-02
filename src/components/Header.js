import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddContactModal from '../components/AddContactModal';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Contacts</Text>
            <TouchableOpacity style={styles.addButton} onPress={AddContactModal}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
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
        fontSize: 32,
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
