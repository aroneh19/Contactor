import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import Header from '../components/Header';
import ContactCard from '../components/ContactCard';
import SearchBar from '../components/SearchBar';

const MainView = () => {
    const contacts = [
        { id: '1', name: 'John Doe', phone: '123-456-7890' },
        { id: '2', name: 'Jane Smith', phone: '987-654-3210' },
        { id: '3', name: 'Sam Wilson', phone: '555-123-4567' },
        { id: '4', name: 'Chris Brown', phone: '222-333-4444' },
        { id: '5', name: 'Kelly Adams', phone: '111-222-3333' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ContactCard name={item.name} phone={item.phone} />}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
            <SearchBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    list: {
        padding: 16,
    },
});

export default MainView;
