import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ContactModal from '../components/ContactModal';

const ContactDetailView = ({ route }) => {
    const { name, phone } = route.params; // Correctly access name and phone
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="call-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="create-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.centeredContent}>
                <View style={styles.cardContainer}>
                    <View style={styles.imagePlaceholder} />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </View>
            <ContactModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Edit Contact"
                initialName={name}
                initialPhone={phone}
                onSubmit={(updatedName, updatedPhone) => {
                    // Handle contact update logic here
                    console.log('Updated Contact:', updatedName, updatedPhone);
                    setModalVisible(false);
                }}
                submitButtonText="Save Changes"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    headerIcons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    iconButton: {
        backgroundColor: '#ffcc00',
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 8,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: '#333333',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#cc4444',
        borderRadius: 12,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    phone: {
        fontSize: 18,
        color: '#ccc',
    },
});

export default ContactDetailView;
