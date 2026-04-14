import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { restaurants, foodItems } from '../data/mockData';
import { useCartStore } from '../store/cartStore';

type RouteParams = { Menu: { restaurantId: string } };

export function MenuScreen() {
  const route = useRoute<RouteProp<RouteParams, 'Menu'>>();
  const navigation = useNavigation();
  const { restaurantId } = route.params;
  const restaurant = restaurants.find((r) => r.id === restaurantId)!;
  const items = foodItems.filter((f) => f.restaurantId === restaurantId);
  const categories = [...new Set(items.map((i) => i.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const getQty = (id: string) => cartItems.find((i) => i.id === id)?.quantity ?? 0;
  const filtered = items.filter((i) => i.category === activeCategory);

  const toggleFav = (id: string) =>
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroContainer}>
          <Image source={restaurant.image} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn} onPress={() => toggleFav(restaurant.id)}>
            <Text style={styles.favBtnText}>{favorites.includes(restaurant.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <View style={styles.heroInfo}>
            <View style={styles.heroTags}>
              {restaurant.tags.map((tag) => (
                <View key={tag} style={styles.heroTag}>
                  <Text style={styles.heroTagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.heroName}>{restaurant.name}</Text>
            <Text style={styles.heroCategory}>{restaurant.category}</Text>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaItem}>⭐ {restaurant.rating}</Text>
              <Text style={styles.heroMetaDot}>•</Text>
              <Text style={styles.heroMetaItem}>🕐 {restaurant.deliveryTime}</Text>
              <Text style={styles.heroMetaDot}>•</Text>
              <Text style={styles.heroMetaItem}>🛵 ${restaurant.deliveryFee}</Text>
            </View>
          </View>
        </View>

        {/* Category tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.tab, activeCategory === cat && styles.tabActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.tabText, activeCategory === cat && styles.tabTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Food Items */}
        <View style={styles.itemsContainer}>
          {filtered.map((item) => {
            const qty = getQty(item.id);
            const isFav = favorites.includes(item.id);
            return (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImageContainer}>
                  <Image source={item.image} style={styles.itemImage} />
                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>🔥</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.itemFavBtn} onPress={() => toggleFav(item.id)}>
                    <Text style={{ fontSize: 16 }}>{isFav ? '❤️' : '🤍'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                  <View style={styles.itemBottom}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    {qty === 0 ? (
                      <TouchableOpacity style={styles.addBtn} onPress={() => addItem(item)}>
                        <Text style={styles.addBtnText}>+ Add</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.qtyControl}>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => useCartStore.getState().decrementItem(item.id)}>
                          <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyValue}>{qty}</Text>
                        <TouchableOpacity style={styles.qtyBtn} onPress={() => useCartStore.getState().incrementItem(item.id)}>
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <TouchableOpacity style={styles.cartBar} onPress={() => navigation.goBack()}>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalItems}</Text>
          </View>
          <Text style={styles.cartBarText}>View Cart</Text>
          <Text style={styles.cartBarPrice}>${totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  heroContainer: { height: 280, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  backBtn: { position: 'absolute', top: 52, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.95)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 3 },
  backBtnText: { fontSize: 18, color: '#111' },
  favBtn: { position: 'absolute', top: 52, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.95)', alignItems: 'center', justifyContent: 'center' },
  favBtnText: { fontSize: 18 },
  heroInfo: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  heroTags: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  heroTag: { backgroundColor: '#FF4500', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  heroTagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  heroName: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 4 },
  heroCategory: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 10 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroMetaItem: { fontSize: 13, color: '#fff', fontWeight: '500' },
  heroMetaDot: { color: 'rgba(255,255,255,0.4)' },
  tabsScroll: { paddingHorizontal: 20, paddingVertical: 14 },
  tab: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 20, backgroundColor: '#f5f5f5', marginRight: 8 },
  tabActive: { backgroundColor: '#FF4500' },
  tabText: { color: '#666', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#fff' },
  itemsContainer: { paddingHorizontal: 20 },
  itemCard: { flexDirection: 'row', marginBottom: 14, backgroundColor: '#fff', borderRadius: 18, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3, overflow: 'hidden' },
  itemImageContainer: { position: 'relative' },
  itemImage: { width: 115, height: 115, resizeMode: 'cover' },
  popularBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: '#FF4500', width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  popularText: { fontSize: 12 },
  itemFavBtn: { position: 'absolute', bottom: 6, right: 6 },
  itemInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
  itemName: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 4 },
  itemDesc: { fontSize: 12, color: '#999', lineHeight: 17, flex: 1 },
  itemBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  itemPrice: { fontSize: 16, fontWeight: '800', color: '#FF4500' },
  addBtn: { backgroundColor: '#FF4500', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  qtyValue: { fontSize: 15, fontWeight: '700', color: '#111', minWidth: 16, textAlign: 'center' },
  cartBar: { position: 'absolute', bottom: 28, left: 20, right: 20, backgroundColor: '#FF4500', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', shadowColor: '#FF4500', shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  cartBadge: { backgroundColor: '#fff', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cartBadgeText: { color: '#FF4500', fontWeight: '900', fontSize: 13 },
  cartBarText: { flex: 1, color: '#fff', fontWeight: '700', fontSize: 16 },
  cartBarPrice: { color: '#fff', fontWeight: '900', fontSize: 16 },
});
