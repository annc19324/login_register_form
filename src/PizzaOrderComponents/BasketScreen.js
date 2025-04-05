import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BasketScreen = () => {
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const cartData = await AsyncStorage.getItem('cart');
            setCart(cartData ? JSON.parse(cartData).cart : []);
        };
        loadCart();
    }, []);

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);
    };

    const clearCart = async () => {
        await AsyncStorage.setItem('cart', JSON.stringify({ cart: [] }));
        setCart([]);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Your Basket</Text>
            {cart.length === 0 ? (
                <Text style={styles.text}>Your basket is empty.</Text>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{item.name}</Text>
                            <Text>Size: {item.size}</Text>
                            <Text>Add-ons: {item.addOns.join(', ') || 'None'}</Text>
                            <Text>Qty: {item.quantity}</Text>
                            <Text>Price: ${item.totalPrice}</Text>
                        </View>
                    ))}
                    <Text style={styles.total}>Total: ${calculateTotal()}</Text>
                    <TouchableOpacity style={styles.button} onPress={clearCart}>
                        <Text style={styles.buttonText}>Clear Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Checkout implemented')}>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    text: { fontSize: 16, textAlign: 'center' },
    item: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginVertical: 5, borderRadius: 5 },
    total: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginVertical: 5, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16 },
});

export default BasketScreen;