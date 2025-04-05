import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Animated, Modal } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { FlatList } from "react-native-gesture-handler";

const ClockScreen = () => {
    const [time, setTime] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [baseOffset, setBaseOffset] = useState(7);
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            const vietnamOffset = 7 * 60 * 60 * 1000; // UTC+7
            const newTime = new Date(Date.now() - vietnamOffset + (baseOffset * 60 * 60 * 1000));
            setTime(newTime);
        }, 1000);

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        return () => clearInterval(interval);
    }, [baseOffset]);

    const cities = [
        { name: 'Dakar', timezone: -1 },
        { name: 'Tokyo', timezone: 9 },
        { name: 'Queensland', timezone: 10 },
        { name: 'Barcelona', timezone: 1 },
        { name: 'New York', timezone: -4 },
        { name: 'London', timezone: 0 },
        { name: 'Vietnam', timezone: 7 },
    ];

    const getCityTime = (timezone) => {
        const offset = timezone * 60 * 60 * 1000;
        const localTime = new Date(time.getTime() + offset - (baseOffset * 60 * 60 * 1000));
        return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleCitySelect = (timezone) => {
        setBaseOffset(timezone);
        setShowModal(false);
    };

    const scale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
    });

    const opacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 0.2],
    });

    return (
        <View style={styles.container}>
            <View style={styles.clockContainer}>
                <Animated.View
                    style={[
                        styles.pulseRing,
                        {
                            transform: [{ scale }],
                            opacity,
                        }
                    ]}
                />
                <View style={styles.circle}>
                    <Text style={styles.currentTime}>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <Text style={styles.currentDate}>{time.toLocaleDateString()}</Text>
                </View>
            </View>

            <View style={styles.listWrapper}>
                <FlatList
                    data={cities}
                    contentContainerStyle={styles.listContainer}
                    keyExtractor={(item) => item.name}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.cityName}>{item.name}</Text>
                            <Text style={styles.cityTime}>{getCityTime(item.timezone)}</Text>
                        </View>
                    )}
                />
            </View>

            <TouchableOpacity
                style={styles.setClockButton}
                onPress={() => setShowModal(true)}
            >
                <Text style={styles.setClockText}>Set Clock</Text>
            </TouchableOpacity>

            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Time Zone</Text>
                        <FlatList
                            data={cities}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleCitySelect(item.timezone)}
                                >
                                    <Text style={styles.modalItemText}>
                                        {item.name} (UTC{item.timezone >= 0 ? '+' : ''}{item.timezone})
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        justifyContent: 'space-between',
    },
    clockContainer: {
        alignSelf: 'center',
        marginTop: 30,
        position: 'relative',
    },
    circle: {
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: '#FF4081',
        zIndex: 2,
    },
    pulseRing: {
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: '#FF4081',
        position: 'absolute',
        zIndex: 1,
    },
    currentTime: {
        fontSize: 50,
        fontWeight: '300',
        marginBottom: 10,
        color: '#000000',
    },
    currentDate: {
        fontSize: 15,
        color: '#555',
    },
    listWrapper: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        maxHeight: 200,
    },
    listContainer: {
        alignItems: 'center',
    },
    listItem: {
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    cityName: {
        fontSize: 18,
        color: '#333',
    },
    cityTime: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    setClockButton: {
        backgroundColor: '#FF4081',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
        width: 150,
        alignSelf: 'center',
    },
    setClockText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#FF4081',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 15,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ClockScreen;