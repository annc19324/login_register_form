import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClockScreen = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString();
    };

    const formatDate = (date) => {
        return date.toLocaleDateString();
    };

    const getTimeZones = () => {
        return [
            { city: 'Dakar', offset: -1 },
            { city: 'Tokyo', offset: 9 },
            { city: 'Queensland', offset: 10 },
            { city: 'Barcelona', offset: 1 },
        ];
    };

    const getCityTime = (offset) => {
        const localTime = new Date();
        const utcTime = new Date(localTime.getTime() + localTime.getTimezoneOffset() * 60000);
        return new Date(utcTime.getTime() + offset * 3600 * 1000);
    };

    return (
        <View style={styles.container}>
            {/* Clock display */}
            <View style={styles.clockContainer}>
                <View style={styles.clockFace}>
                    <Text style={styles.timeText}>{formatTime(time)}</Text>
                    <Text style={styles.dateText}>{formatDate(time)}</Text>
                </View>
            </View>

            {/* Time zone section */}
            <View style={styles.timeZones}>
                {getTimeZones().map((zone, index) => {
                    const cityTime = getCityTime(zone.offset);
                    return (
                        <View key={index} style={styles.timeZone}>
                            <Text style={styles.cityName}>{zone.city}</Text>
                            <Text style={styles.cityTime}>{formatTime(cityTime)}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    clockContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    clockFace: {
        width: 260,
        height: 260,
        borderRadius: 150,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: '#FF4081',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginTop: 50,
    },
    timeText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000000',
    },
    dateText: {
        fontSize: 18,
        color: '#000000',
        marginTop: 10,
    },
    timeZones: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    timeZone: {
        alignItems: 'center',
        marginVertical: 10,
    },
    cityName: {
        fontSize: 18,
        color: '#000000',
    },
    cityTime: {
        fontSize: 16,
        color: '#000000',
    },
});

export default ClockScreen;