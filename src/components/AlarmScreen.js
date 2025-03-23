import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';

const AlarmScreen = () => {
    const [alarms, setAlarms] = useState([
        { id: '1', time: '07:00', label: 'Wake up!' },
        { id: '2', time: '07:15', label: 'Kom really evale up!' },
        { id: '3', time: '08:00', label: 'Xpery mind...' },
    ]);
    const [newAlarmTime, setNewAlarmTime] = useState('');
    const [newAlarmLabel, setNewAlarmLabel] = useState('');

    const addAlarm = () => {
        if (newAlarmTime && newAlarmLabel) {
            const newAlarm = {
                id: Math.random().toString(),
                time: newAlarmTime,
                label: newAlarmLabel,
            };
            setAlarms([...alarms, newAlarm]);
            setNewAlarmTime('');
            setNewAlarmLabel('');
        }
    };

    const removeAlarm = (id) => {
        setAlarms(alarms.filter((alarm) => alarm.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alarm</Text>
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.alarmItem}>
                        <Text style={styles.alarmTime}>{item.time}</Text>
                        <Text style={styles.alarmLabel}>{item.label}</Text>
                        <TouchableOpacity onPress={() => removeAlarm(item.id)}>
                            <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.addAlarmContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Time (e.g., 07:00)"
                    value={newAlarmTime}
                    onChangeText={setNewAlarmTime}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Label (e.g., Wake up!)"
                    value={newAlarmLabel}
                    onChangeText={setNewAlarmLabel}
                />
                <Button title="Add Alarm" onPress={addAlarm} color="#FF4081" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF4081',
        marginBottom: 20,
    },
    alarmItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    alarmTime: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    alarmLabel: {
        fontSize: 16,
        color: '#555',
    },
    removeText: {
        color: '#FF4081',
        fontWeight: 'bold',
    },
    addAlarmContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default AlarmScreen;