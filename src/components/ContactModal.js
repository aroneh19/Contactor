import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const ContactModal = ({
                          visible,
                          onClose,
                          title,
                          initialName = '',
                          initialPhone = '',
                          onSubmit,
                          submitButtonText
                      }) => {
    const [name, setName] = React.useState(initialName);
    const [phone, setPhone] = React.useState(initialPhone);

    React.useEffect(() => {
        setName(initialName);
        setPhone(initialPhone);
    }, [initialName, initialPhone]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{title}</Text>
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
                        onPress={() => {
                            onSubmit(name, phone);
                            onClose();
                        }}
                    >
                        <Text style={styles.submitButtonText}>{submitButtonText}</Text>
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

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#333333',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        backgroundColor: '#444',
        borderRadius: 10,
        padding: 10,
        color: '#fff',
        marginBottom: 10,
    },
    submitButton: {
        marginTop: 10,
        backgroundColor: '#ffcc00',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#999',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ContactModal;
