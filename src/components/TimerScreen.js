import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const TimerScreen = () => {
    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const startTimer = () => {
        if (inputTime > 0) {
            setTime(parseInt(inputTime, 10));
            setIsRunning(true);
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTime(0);
        setInputTime('');
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(time)}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter time in seconds"
                keyboardType="numeric"
                value={inputTime}
                onChangeText={setInputTime}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isRunning ? pauseTimer : startTimer}>
                    <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={resetTimer}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        width: '80%',
        marginBottom: 20,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#FF4081',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TimerScreen;