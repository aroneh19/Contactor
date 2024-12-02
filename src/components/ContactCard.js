import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ContactCard = ({ name, phone, handelNav }) => {
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


    return (
        <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
            <View
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <View style={styles.imagePlaceholder} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.phone}>{phone}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#292929',
        borderRadius: 0,
        alignItems: 'center',
        margin: 8,
        flex: 1,
        maxWidth: '47%',
        paddingBottmom: 0,
    },
    imagePlaceholder: {
        width: 150,
        height: 120,
        backgroundColor: '#cc4444',
        borderRadius: 16,
        marginBottom: 12,
        marginTop: 0,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fdfdfd',
    },
    phone: {
        fontSize: 14,
        color: '#ccc',
    },
});

export default ContactCard;
