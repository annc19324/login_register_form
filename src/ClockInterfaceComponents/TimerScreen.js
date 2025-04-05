import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TimerScreen = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [initialTime, setInitialTime] = useState(45 * 60 * 1000);
    const [isRunning, setIsRunning] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('45');
    const [seconds, setSeconds] = useState('00');

    // Animation values
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let interval;
        if (isRunning && currentTime > 0) {
            interval = setInterval(() => {
                setCurrentTime(prev => prev - 1000);
            }, 1000);
        } else if (currentTime <= 0 && isRunning) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentTime]);

    const animatePulse = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.8,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        ]).start();
    };

    const handleStart = () => {
        setIsRunning(true);
        animatePulse();
    };

    const handleStop = () => {
        setIsRunning(false);
        animatePulse();
    };

    const handleReset = () => {
        setIsRunning(false);
        setCurrentTime(initialTime);
        animatePulse();
    };

    const handleCreateNewTime = () => {
        setShowTimePicker(true);
    };

    const handleSaveNewTime = () => {
        const totalMs =
            (parseInt(hours) * 3600000) +
            (parseInt(minutes) * 60000) +
            (parseInt(seconds) * 1000);

        setInitialTime(totalMs);
        setCurrentTime(totalMs);
        setShowTimePicker(false);
    };

    const formatTime = (timeInMs) => {
        const hrs = Math.floor(timeInMs / 3600000).toString().padStart(2, '0');
        const mins = Math.floor((timeInMs % 3600000) / 60000).toString().padStart(2, '0');
        const secs = Math.floor((timeInMs % 60000) / 1000).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <View style={styles.container}>
            {/* Vòng tròn với hiệu ứng pulse */}
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
                    <Text style={styles.runningTime}>{formatTime(currentTime)}</Text>
                </View>
            </View>

            {/* Thời gian ban đầu và nút thêm */}
            <View style={styles.initialTimeContainer}>
                <Text style={styles.initialTime}>{formatTime(initialTime)}</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleCreateNewTime}
                >
                    <MaterialIcons name="add" size={24} color="#22B7A5" />
                </TouchableOpacity>
            </View>

            {/* 3 nút điều khiển: Reset - Run - Stop */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={handleReset}
                >
                    <MaterialIcons name="stop" size={30} color="#333" />
                    <Text style={styles.controlButtonText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={handleStart}
                    disabled={isRunning}
                >
                    <MaterialIcons name="play-arrow" size={30} color="#333" />
                    <Text style={styles.controlButtonText}>Run</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={handleStop}
                    disabled={!isRunning}
                >
                    <MaterialIcons name="pause" size={30} color="#333" />
                    <Text style={styles.controlButtonText}>Stop</Text>
                </TouchableOpacity>
            </View>

            {/* Modal tạo thời gian mới */}
            <Modal visible={showTimePicker} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Set New Time</Text>

                        <View style={styles.timeInputContainer}>
                            <View style={styles.timeInput}>
                                <Text style={styles.timeLabel}>Hours</Text>
                                <TextInput
                                    style={styles.input}
                                    value={hours}
                                    onChangeText={setHours}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                            </View>

                            <Text style={styles.timeSeparator}>:</Text>

                            <View style={styles.timeInput}>
                                <Text style={styles.timeLabel}>Minutes</Text>
                                <TextInput
                                    style={styles.input}
                                    value={minutes}
                                    onChangeText={setMinutes}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                            </View>

                            <Text style={styles.timeSeparator}>:</Text>

                            <View style={styles.timeInput}>
                                <Text style={styles.timeLabel}>Seconds</Text>
                                <TextInput
                                    style={styles.input}
                                    value={seconds}
                                    onChangeText={setSeconds}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                            </View>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowTimePicker(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSaveNewTime}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    clockContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: '#22B7A5',
        zIndex: 2,
    },
    pulseRing: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#22B7A5',
        position: 'absolute',
        zIndex: 1,
    },
    runningTime: {
        fontSize: 40,
        fontWeight: '300',
        color: '#333',
        fontFamily: 'monospace',
    },
    initialTimeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    initialTime: {
        fontSize: 30,
        fontWeight: '300',
        color: '#666',
        fontFamily: 'monospace',
        marginBottom: 10,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingBottom: 30,
    },
    controlButton: {
        alignItems: 'center',
        width: 80,
        paddingVertical: 12,
        borderRadius: 8,
    },
    controlButtonText: {
        marginTop: 5,
        color: '#333',
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
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    timeInput: {
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        width: 60,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
    },
    timeSeparator: {
        fontSize: 30,
        marginHorizontal: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
    },
    saveButton: {
        backgroundColor: '#22B7A5',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TimerScreen;