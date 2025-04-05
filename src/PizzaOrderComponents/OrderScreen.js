import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = ({ route }) => {
    const { product } = route.params;
    const [selectedSize, setSelectedSize] = useState('Large');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const calculateTotal = () => {
        const sizePrice = product.options.find(o => o.size === selectedSize).price;
        const addOnPrice = selectedAddOns.reduce((sum, addOn) => sum + product.addOns.find(a => a.name === addOn).price, 0);
        return (sizePrice + addOnPrice) * quantity;
    };

    const addToCart = async () => {
        const cartItem = {
            productId: product.id,
            name: product.name,
            size: selectedSize,
            addOns: selectedAddOns,
            quantity,
            totalPrice: calculateTotal().toFixed(2),
        };
        const existingCart = await AsyncStorage.getItem('cart');
        const cartData = existingCart ? JSON.parse(existingCart) : { cart: [] };
        cartData.cart.push(cartItem);
        await AsyncStorage.setItem('cart', JSON.stringify(cartData));
        navigation.navigate('Basket');
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: `file:///android_asset/images/${product.image}` }} style={styles.detailImage} />
            <Text style={styles.detailName}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.sectionTitle}>Select Size</Text>
            {product.options.map(option => (
                <View key={option.size} style={styles.optionRow}>
                    <TouchableOpacity
                        style={styles.radio}
                        onPress={() => setSelectedSize(option.size)}
                    >
                        {selectedSize === option.size && <View style={styles.radioInner} />}
                    </TouchableOpacity>
                    <Text>{option.size} {option.diameter} - ${option.price}</Text>
                </View>
            ))}
            <Text style={styles.sectionTitle}>Choose Add Ons</Text>
            {product.addOns.map(addOn => (
                <View key={addOn.name} style={styles.optionRow}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => {
                            setSelectedAddOns(prev =>
                                prev.includes(addOn.name) ? prev.filter(a => a !== addOn.name) : [...prev, addOn.name]
                            );
                        }}
                    >
                        {selectedAddOns.includes(addOn.name) && <Text style={styles.checkmark}>✔</Text>}
                    </TouchableOpacity>
                    <Text>{addOn.name} +${addOn.price}</Text>
                </View>
            ))}
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantity}>
                <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton} onPress={addToCart}>
                <Text style={styles.addText}>Add (${calculateTotal().toFixed(2)})</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    detailImage: { width: 200, height: 200, alignSelf: 'center' },
    detailName: { fontSize: 20, textAlign: 'center', marginVertical: 10 },
    description: { textAlign: 'center', marginBottom: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    optionRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    radio: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: '#000', marginRight: 10, alignItems: 'center', justifyContent: 'center' },
    radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#000' },
    checkbox: { height: 20, width: 20, borderWidth: 2, borderColor: '#000', marginRight: 10, justifyContent: 'center' },
    checkmark: { textAlign: 'center', color: '#000' },
    quantity: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    quantityButton: { fontSize: 20, padding: 5 },
    quantityText: { fontSize: 18, marginHorizontal: 10 },
    total: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, alignItems: 'center' },
    addText: { color: '#fff', fontSize: 16 },
});

export default OrderScreen;