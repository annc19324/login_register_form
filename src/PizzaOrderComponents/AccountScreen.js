import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.text}>This is a placeholder for the account screen.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    text: { fontSize: 16 },
});

export default AccountScreen;