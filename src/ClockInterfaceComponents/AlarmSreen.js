import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Switch,
    Modal,
    TextInput,
    Alert,
    SafeAreaView,
    Platform,
} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AlarmScreen = () => {
    const [alarms, setAlarms] = useState([
        // { id: "1", time: "07:00", label: "Yokka up!", enabled: true, repeat: [] },
        // { id: "2", time: "07:15", label: "Sono trudny muka up!", enabled: true, repeat: [] },
        // { id: "3", time: "08:00", label: "Namor mówi...", enabled: false, repeat: [] },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLabel, setNewLabel] = useState("");
    const [selectedHour, setSelectedHour] = useState(new Date().getHours());
    const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
    const [repeatDays, setRepeatDays] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
    });

    const toggleAlarm = (id) => {
        setAlarms(
            alarms.map((alarm) =>
                alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
            )
        );
    };

    const formatTime = (hour, minute) => {
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    const addAlarm = () => {
        if (newLabel) {
            const selectedDays = Object.keys(repeatDays).filter(day => repeatDays[day]);
            const newAlarm = {
                id: Date.now().toString(),
                time: formatTime(selectedHour, selectedMinute),
                label: newLabel,
                enabled: true,
                repeat: selectedDays,
            };
            setAlarms([...alarms, newAlarm]);
            setNewLabel("");
            setSelectedHour(new Date().getHours());
            setSelectedMinute(new Date().getMinutes());
            setRepeatDays({
                Mon: false,
                Tue: false,
                Wed: false,
                Thu: false,
                Fri: false,
                Sat: false,
                Sun: false,
            });
            setModalVisible(false);
        }
    };

    const handleLongPress = (id) => {
        Alert.alert(
            "Xóa báo thức",
            "Bạn có muốn xóa báo thức này không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    onPress: () => setAlarms(alarms.filter((alarm) => alarm.id !== id)),
                    style: "destructive"
                }
            ]
        );
    };

    const toggleRepeatDay = (day) => {
        setRepeatDays(prev => ({ ...prev, [day]: !prev[day] }));
    };

    const adjustHour = (increment) => {
        setSelectedHour((prev) => {
            let newHour = prev + increment;
            if (newHour >= 24) newHour = 0;
            if (newHour < 0) newHour = 23;
            return newHour;
        });
    };

    const adjustMinute = (increment) => {
        setSelectedMinute((prev) => {
            let newMinute = prev + increment;
            if (newMinute >= 60) newMinute = 0;
            if (newMinute < 0) newMinute = 59;
            return newMinute;
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.alarmItem}
            onLongPress={() => handleLongPress(item.id)}
        >
            <View style={styles.alarmTimeContainer}>
                <Text style={styles.alarmTime}>{item.time}</Text>
                <Text style={styles.alarmLabel}>{item.label}</Text>
                {item.repeat.length > 0 && (
                    <Text style={styles.repeatText}>
                        Lặp: {item.repeat.join(", ")}
                    </Text>
                )}
            </View>
            <Switch
                value={item.enabled}
                onValueChange={() => toggleAlarm(item.id)}
                trackColor={{ false: "#808080", true: "#00CED1" }}
                thumbColor="#FFFFFF"
            />
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={alarms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.alarmList}
                    scrollEnabled={false}

                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setSelectedHour(new Date().getHours());
                        setSelectedMinute(new Date().getMinutes());
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.addButtonText}>Add Alarm</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.timePickerContainer}>
                                <View style={styles.timeColumn}>
                                    <TouchableOpacity onPress={() => adjustHour(1)}>
                                        <Text style={styles.arrow}>▲</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.timeText}>
                                        {String(selectedHour).padStart(2, '0')}
                                    </Text>
                                    <TouchableOpacity onPress={() => adjustHour(-1)}>
                                        <Text style={styles.arrow}>▼</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.colon}>:</Text>
                                <View style={styles.timeColumn}>
                                    <TouchableOpacity onPress={() => adjustMinute(1)}>
                                        <Text style={styles.arrow}>▲</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.timeText}>
                                        {String(selectedMinute).padStart(2, '0')}
                                    </Text>
                                    <TouchableOpacity onPress={() => adjustMinute(-1)}>
                                        <Text style={styles.arrow}>▼</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="lời nhắc"
                                value={newLabel}
                                onChangeText={setNewLabel}
                            />

                            <Text style={styles.repeatLabel}>Lặp lại:</Text>
                            <View style={styles.repeatOptions}>
                                {Object.keys(repeatDays).map(day => (
                                    <TouchableOpacity
                                        key={day}
                                        style={[
                                            styles.dayButton,
                                            repeatDays[day] && styles.dayButtonSelected
                                        ]}
                                        onPress={() => toggleRepeatDay(day)}
                                    >
                                        <Text style={repeatDays[day] ? styles.dayTextSelected : styles.dayText}>
                                            {day.slice(0, 2)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.saveButton]}
                                    onPress={addAlarm}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: Platform.OS === 'web' ? 20 : 0,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        marginTop: Platform.OS === 'ios' ? 25 : 0,
    },
    alarmList: {
        flex: 1,
        marginTop: 20,
    },
    alarmItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingHorizontal: 20,
    },
    alarmTimeContainer: {
        flexDirection: "column",
    },
    alarmTime: {
        fontSize: 24,
        fontWeight: "300",
        color: "#000000",
    },
    alarmLabel: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
    repeatText: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },
    addButton: {
        backgroundColor: '#3E7EFB',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
        width: 150,
        alignSelf: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    timePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    timeColumn: {
        alignItems: "center",
    },
    arrow: {
        fontSize: 24,
        color: "#000",
    },
    timeText: {
        fontSize: 36,
        fontWeight: "300",
        marginVertical: 5,
    },
    colon: {
        fontSize: 36,
        marginHorizontal: 10,
    },
    input: {
        border: 1,
        Width: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    repeatLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    repeatOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    dayButton: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    dayButtonSelected: {
        backgroundColor: "#00CED1",
        borderColor: "#00CED1",
    },
    dayText: {
        color: "#000",
    },
    dayTextSelected: {
        color: "#fff",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        padding: 10,
    },
    saveButton: {
        backgroundColor: "#3E7EFB",
        borderRadius: 5,
    },
    saveButtonText: {
        color: "white",
    },
});

export default AlarmScreen;