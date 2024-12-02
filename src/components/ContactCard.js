import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ContactCard = ({ name, phone, handelNav }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };


    return (
        <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
            <View 
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.touchable}
            >
                <View style={styles.imagePlaceholder} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.phone}>{phone}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: 150,
    height: 115,
    backgroundColor: "#D84343",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  phone: {
    fontSize: 14,
    color: "#CCCCCC",
    textAlign: "center",
  },
});

export default ContactCard;
