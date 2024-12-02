import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const AddContactModal = ({ visible, onClose, onSubmit }) => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleAddContact = () => {
        if (name && phone) {
            onSubmit(name, phone);
            onClose();
            setName('');
            setPhone('');
        } else {
            alert('Please fill out both fields.');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Contact</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#ccc"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#ccc"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleAddContact}
                    >
                        <Text style={styles.submitButtonText}>Add Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddContactModal;