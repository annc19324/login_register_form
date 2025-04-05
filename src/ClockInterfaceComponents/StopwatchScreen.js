import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';

const StopwatchScreen = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const [lapTime, setLapTime] = useState(0);
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
                setLapTime(prevLapTime => prevLapTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            animatePulse();
        }
    };

    const handleLapReset = () => {
        if (isRunning) {
            setLaps(prevLaps => [
                { id: Date.now().toString(), time: lapTime, lapNumber: prevLaps.length + 1 },
                ...prevLaps
            ]);
            setLapTime(0);
            animatePulse();
        } else {
            setTime(0);
            setLapTime(0);
            setLaps([]);
        }
    };

    const formatTime = (timeInMs) => {
        const minutes = Math.floor(timeInMs / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeInMs % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor((timeInMs % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    };

    const formatLapTime = (timeInMs) => {
        const minutes = Math.floor(timeInMs / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((timeInMs % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor((timeInMs % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${milliseconds}`;
    };

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

    return (
        <View style={styles.container}>
            {/* Vòng tròn đồng hồ với hiệu ứng pulse */}
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
                    <Text style={styles.currentTime}>{formatTime(time)}</Text>
                    <Text style={styles.currentDate}>{new Date().toLocaleDateString()}</Text>
                </View>
            </View>

            {/* Danh sách lap */}
            <FlatList
                data={laps}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={[
                        styles.lapItem,
                        index === 0 && styles.firstLapItem
                    ]}>
                        <Text style={styles.lapNumber}>Lap {item.lapNumber}</Text>
                        <Text style={styles.lapTime}>{formatLapTime(item.time)}</Text>
                    </View>
                )}
                style={styles.lapList}
                contentContainerStyle={styles.lapListContent}
            />

            {/* Các nút điều khiển */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={handleLapReset}
                    disabled={time === 0 && !isRunning}
                >
                    <Text style={styles.buttonText}>{isRunning ? 'Lap' : 'Reset'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
                    onPress={handleStartStop}
                >
                    <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 40,
    },
    clockContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    circle: {
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: '#F47A23',
        zIndex: 2,
    },
    pulseRing: {
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: '#F47A23',
        position: 'absolute',
        zIndex: 1,
    },
    currentTime: {
        fontSize: 42,
        fontWeight: '300',
        color: '#333',
    },
    currentDate: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    lapList: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    lapListContent: {
        paddingHorizontal: 20,
    },
    lapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    firstLapItem: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    lapNumber: {
        color: '#333',
        fontSize: 18,
    },
    lapTime: {
        color: '#333',
        fontSize: 18,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    button: {
        width: 100,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: '#F47A23',
    },
    stopButton: {
        backgroundColor: '#F47A23',
    },
    secondaryButton: {
        backgroundColor: '#e0e0e0',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default StopwatchScreen;