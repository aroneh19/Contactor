import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#ccc" />
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#ccc"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 12,
        margin: 16,
        paddingHorizontal: 12,
        height: 40,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        color: '#fff',
        fontSize: 16,
    },
});

export default SearchBar;
