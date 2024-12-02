import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Contacts</Text>
            <TouchableOpacity style={styles.addButton}>
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
        paddingRight: 25,
        paddingLeft: 25,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#333',
        borderWidth : 1,
        borderRadius: 14,
        padding: 8,
        borderColor: '#fff',
    },
});

export default Header;
