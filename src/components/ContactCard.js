import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ContactCard = ({ name, phone }) => {
    const navigation = useNavigation();
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95, // Slightly reduce the size
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1, // Return to original size
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
            console.log(name)
            navigation.navigate('ContactView', { name, phone});

    }

    return (
        <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
            <TouchableOpacity
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View style={styles.imagePlaceholder} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.phone}>{phone}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#292929',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        margin: 8,
        flex: 1,
        maxWidth: '47%',
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#cc4444',
        borderRadius: 8,
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: '#ccc',
    },
});

export default ContactCard;
