import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Image, FlatList, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { restaurants, foodItems } from '../data/mockData';
import { useCartStore } from '../store/cartStore';
import { useAppStore } from '../store/appStore';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<{ Menu: { restaurantId: string } }>;

const categories = ['All', 'Burgers', 'Chicken', 'Gourmet'];

const promos = [
  { id: '1', title: 'Free Delivery\non First Order!', sub: 'Use code: FOODY', bg: '#FF4500', image: require('../../assets/food/burger5.jpg') },
  { id: '2', title: '20% Off\nCrispy Chicken', sub: 'Today only', bg: '#222', image: require('../../assets/food/chicken2.jpg') },
  { id: '3', title: 'Gourmet Burgers\nFrom $9.99', sub: 'Limited time', bg: '#c0392b', image: require('../../assets/food/burger3.jpg') },
];

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [promoIndex, setPromoIndex] = useState(0);
  const userName = useAppStore((s) => s.userName);
  const totalItems = useCartStore((s) => s.totalItems());
  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);

  const popular = foodItems.filter((f) => f.popular).slice(0, 6);
  const filtered = restaurants.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || r.category.includes(activeCategory);
    return matchSearch && matchCat;
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting()} 👋</Text>
          <Text style={styles.title}>
            Hey <Text style={styles.titleAccent}>{userName || 'there'}</Text>,{'\n'}what are you craving?
          </Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{(userName || 'G')[0].toUpperCase()}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants or dishes..."
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ color: '#bbb', fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Promo Carousel */}
      <FlatList
        data={promos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => setPromoIndex(Math.round(e.nativeEvent.contentOffset.x / (width - 40)))}
        style={styles.promoList}
        renderItem={({ item }) => (
          <View style={[styles.banner, { backgroundColor: item.bg, width: width - 40 }]}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSub}>{item.sub}</Text>
              <TouchableOpacity style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <Image source={item.image} style={styles.bannerImage} />
          </View>
        )}
      />
      <View style={styles.promoDots}>
        {promos.map((_, i) => (
          <View key={i} style={[styles.promoDot, i === promoIndex && styles.promoDotActive]} />
        ))}
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Items */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔥 Popular Right Now</Text>
      </View>
      <FlatList
        data={popular}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 24 }}
        renderItem={({ item }) => {
          const qty = cartItems.find((c) => c.id === item.id)?.quantity ?? 0;
          return (
            <View style={styles.popularCard}>
              <Image source={item.image} style={styles.popularImage} />
              <View style={styles.popularBody}>
                <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.popularPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.popularAddBtn}
                  onPress={() => addItem(item)}
                >
                  <Text style={styles.popularAddText}>{qty > 0 ? `In cart (${qty})` : '+ Add'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Restaurants */}
      <Text style={styles.sectionTitle}>Restaurants</Text>
      {filtered.length === 0 && (
        <View style={styles.noResults}>
          <Text style={styles.noResultsEmoji}>🔍</Text>
          <Text style={styles.noResultsText}>No restaurants found</Text>
        </View>
      )}
      {filtered.map((r) => (
        <TouchableOpacity
          key={r.id}
          style={styles.card}
          onPress={() => navigation.navigate('Menu', { restaurantId: r.id })}
          activeOpacity={0.92}
        >
          <Image source={r.image} style={styles.cardImage} />
          <View style={styles.cardBadgeRow}>
            {r.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardRow}>
              <Text style={styles.cardName}>{r.name}</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {r.rating}</Text>
              </View>
            </View>
            <Text style={styles.cardCategory}>{r.category}</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardMeta}>🕐 {r.deliveryTime}</Text>
              <Text style={styles.cardMeta}>  •  </Text>
              <Text style={styles.cardMeta}>🛵 ${r.deliveryFee} delivery</Text>
              <Text style={styles.cardMeta}>  •  </Text>
              <Text style={styles.cardMeta}>Min ${r.minOrder}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 60, marginBottom: 20 },
  greeting: { fontSize: 13, color: '#999', marginBottom: 4 },
  title: { fontSize: 20, fontWeight: '700', color: '#111', lineHeight: 26 },
  titleAccent: { color: '#FF4500' },
  avatarContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#111' },
  promoList: { marginBottom: 10 },
  banner: { borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden', marginRight: 12 },
  bannerContent: { flex: 1 },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: '800', lineHeight: 24, marginBottom: 6 },
  bannerSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 14 },
  bannerBtn: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#FF4500', fontWeight: '700', fontSize: 12 },
  bannerImage: { width: 100, height: 100, borderRadius: 14, marginLeft: 10 },
  promoDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 24 },
  promoDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ddd' },
  promoDotActive: { width: 18, backgroundColor: '#FF4500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 14 },
  categoryScroll: { marginBottom: 24 },
  categoryChip: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 20, backgroundColor: '#f5f5f5', marginRight: 8 },
  categoryChipActive: { backgroundColor: '#FF4500' },
  categoryText: { color: '#666', fontWeight: '600', fontSize: 13 },
  categoryTextActive: { color: '#fff' },
  popularCard: { width: 150, backgroundColor: '#fff', borderRadius: 16, marginRight: 12, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3, overflow: 'hidden' },
  popularImage: { width: '100%', height: 100, resizeMode: 'cover' },
  popularBody: { padding: 10 },
  popularName: { fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 4 },
  popularPrice: { fontSize: 13, fontWeight: '700', color: '#FF4500', marginBottom: 8 },
  popularAddBtn: { backgroundColor: '#fff0ec', borderRadius: 10, paddingVertical: 6, alignItems: 'center' },
  popularAddText: { color: '#FF4500', fontWeight: '700', fontSize: 12 },
  card: { borderRadius: 18, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.09, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 4, backgroundColor: '#fff', overflow: 'hidden' },
  cardImage: { width: '100%', height: 170, resizeMode: 'cover' },
  cardBadgeRow: { flexDirection: 'row', gap: 6, position: 'absolute', top: 12, left: 12 },
  tag: { backgroundColor: '#FF4500', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  cardBody: { padding: 14 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 16, fontWeight: '700', color: '#111' },
  ratingBadge: { backgroundColor: '#fff8e1', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  ratingText: { fontSize: 12, fontWeight: '600', color: '#f59e0b' },
  cardCategory: { fontSize: 13, color: '#999', marginBottom: 6 },
  cardMeta: { fontSize: 11, color: '#888' },
  noResults: { alignItems: 'center', paddingVertical: 40 },
  noResultsEmoji: { fontSize: 40, marginBottom: 10 },
  noResultsText: { fontSize: 15, color: '#bbb', fontWeight: '600' },
});
