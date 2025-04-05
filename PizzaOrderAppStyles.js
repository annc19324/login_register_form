import { StyleSheet } from 'react-native';

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
    productContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 10 },
    productImage: { width: 100, height: 100 },
    productInfo: { flex: 1, marginLeft: 10 },
    productName: { fontSize: 16 },
    productPrice: { fontSize: 16, color: '#4CAF50' },
    addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
    addText: { color: '#fff' },
    basketButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
    basketText: { color: '#fff', fontSize: 16 },
});

export default styles;