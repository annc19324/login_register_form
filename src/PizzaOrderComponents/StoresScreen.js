import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import storeData from '../data/store.json';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoresScreen = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('Pizza');

    const filteredProducts = productsData.products.filter(p => p.category === selectedCategory);

    const addToCart = async (product) => {
        const cartItem = {
            productId: product.id,
            name: product.name,
            size: 'Large',
            addOns: [],
            quantity: 1,
            totalPrice: product.options.find(o => o.size === 'Large').price,
        };
        const existingCart = await AsyncStorage.getItem('cart');
        const cartData = existingCart ? JSON.parse(existingCart) : { cart: [] };
        cartData.cart.push(cartItem);
        await AsyncStorage.setItem('cart', JSON.stringify(cartData));
        navigation.navigate('Basket');
    };

    const renderProductItem = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: `file:///android_asset/images/${item.image}` }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.options.find(o => o.size === 'Large').price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <View>
                    <Text style={styles.storeName}>{storeData.store.name}</Text>
                    <Text style={styles.rating}>★★★★★ {storeData.store.reviews}</Text>
                </View>
                <TouchableOpacity style={styles.openButton}>
                    <Text style={styles.openText}>{storeData.store.status}</Text>
                </TouchableOpacity>
                <Text style={styles.time}>{storeData.store.deliveryTime}</Text>
            </View>
            <View style={styles.categoryRow}>
                {categoriesData.categories.map(category => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity style={styles.basketButton} onPress={() => navigation.navigate('Basket')}>
                <Text style={styles.basketText}>Go to Basket</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    logo: { width: 40, height: 40 },
    storeName: { fontSize: 18, marginLeft: 10 },
    rating: { marginLeft: 10, color: '#888' },
    openButton: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5, marginLeft: 10 },
    openText: { color: '#fff' },
    time: { marginLeft: 10, color: '#888' },
    categoryRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
    categoryButton: { padding: 5 },
    selectedCategory: { borderBottomWidth: 2, borderBottomColor: '#4CAF50' },
    categoryText: { fontSize: 16 },
    listContent: { paddingBottom: 10 },
    row: { justifyContent: 'space-between' },
    productCard: {
        width: '48%', // Approximately half the screen width with some margin
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    productImage: { width: 120, height: 120, resizeMode: 'contain' },
    productInfo: { alignItems: 'center', marginVertical: 5 },
    productName: { fontSize: 16, textAlign: 'center' },
    productPrice: { fontSize: 16, color: '#4CAF50', textAlign: 'center' },
    addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center' },
    addText: { color: '#fff', fontSize: 16 },
    basketButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
    basketText: { color: '#fff', fontSize: 16 },
});

export default StoresScreen;