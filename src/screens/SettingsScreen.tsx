import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useAppStore } from '../store/appStore';
import { useCartStore } from '../store/cartStore';

const pastOrders = [
  { id: 'o1', restaurant: 'Big Smoke Burgers', items: 'Classic Smash Burger x2', total: '$21.97', date: 'Apr 10, 2026', emoji: '🍔' },
  { id: 'o2', restaurant: 'Crispy & Co.', items: 'Crispy Chicken Burger x1', total: '$10.98', date: 'Apr 8, 2026', emoji: '🍗' },
  { id: 'o3', restaurant: 'The Patty Lab', items: 'Truffle Wagyu Burger x1', total: '$21.98', date: 'Apr 5, 2026', emoji: '🥩' },
];

const addresses = [
  { id: 'a1', label: '🏠 Home', address: '123 Main Street, Cairo' },
  { id: 'a2', label: '💼 Work', address: '45 Business Ave, Cairo' },
];

export function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [offers, setOffers] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');
  const { userName, userEmail, logout } = useAppStore();
  const cartItems = useCartStore((s) => s.items);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{(userName || 'G')[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.profileName}>{userName || 'Guest'}</Text>
        <Text style={styles.profileEmail}>{userEmail || 'guest@foody.com'}</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>✏️  Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{pastOrders.length}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{cartItems.length}</Text>
          <Text style={styles.statLabel}>In Cart</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$54</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['orders', 'addresses', 'settings'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'orders' ? '📦 Orders' : tab === 'addresses' ? '📍 Addresses' : '⚙️ Settings'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <View style={styles.section}>
          {pastOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderLeft}>
                <Text style={styles.orderEmoji}>{order.emoji}</Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
                <Text style={styles.orderItems}>{order.items}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={styles.orderTotal}>{order.total}</Text>
                <TouchableOpacity style={styles.reorderBtn}>
                  <Text style={styles.reorderBtnText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <View style={styles.section}>
          {addresses.map((addr) => (
            <View key={addr.id} style={styles.addressCard}>
              <Text style={styles.addressLabel}>{addr.label}</Text>
              <Text style={styles.addressText}>{addr.address}</Text>
              <TouchableOpacity style={styles.addressEditBtn}>
                <Text style={styles.addressEditText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addAddressBtn}>
            <Text style={styles.addAddressText}>+ Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <View style={styles.section}>
          <View style={styles.settingsBox}>
            <View style={styles.settingsRow}>
              <Text style={styles.settingsLabel}>🔔 Push Notifications</Text>
              <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#FF4500' }} thumbColor="#fff" />
            </View>
            <View style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.settingsLabel}>🏷️ Special Offers</Text>
              <Switch value={offers} onValueChange={setOffers} trackColor={{ true: '#FF4500' }} thumbColor="#fff" />
            </View>
          </View>
          <View style={styles.settingsBox}>
            {['💳  Payment Methods', '❓  Help & Support', '⭐  Rate FOODY', '📄  Privacy Policy'].map((item, i, arr) => (
              <TouchableOpacity key={item} style={[styles.settingsRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={styles.settingsLabel}>{item}</Text>
                <Text style={styles.settingsArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>🚪  Log Out</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 110 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  profileHeader: { alignItems: 'center', paddingTop: 60, paddingBottom: 20 },
  avatarCircle: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#FF4500', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  avatarText: { color: '#fff', fontWeight: '900', fontSize: 36 },
  profileName: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: '#999', marginBottom: 14 },
  editBtn: { backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingVertical: 9, borderRadius: 20 },
  editBtnText: { fontSize: 13, fontWeight: '600', color: '#555' },
  statsRow: { flexDirection: 'row', backgroundColor: '#fff5f0', borderRadius: 18, padding: 20, marginBottom: 20, alignItems: 'center' },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#FF4500', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#999', fontWeight: '500' },
  statDivider: { width: 1, height: 36, backgroundColor: '#ffd5c2' },
  tabs: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderRadius: 14, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 12 },
  tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tabText: { fontSize: 11, fontWeight: '600', color: '#999' },
  tabTextActive: { color: '#FF4500' },
  section: { gap: 12 },
  orderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 16, padding: 14, gap: 12 },
  orderLeft: { width: 46, height: 46, backgroundColor: '#fff0ec', borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  orderEmoji: { fontSize: 22 },
  orderInfo: { flex: 1 },
  orderRestaurant: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 2 },
  orderItems: { fontSize: 12, color: '#888', marginBottom: 2 },
  orderDate: { fontSize: 11, color: '#bbb' },
  orderRight: { alignItems: 'flex-end', gap: 6 },
  orderTotal: { fontSize: 14, fontWeight: '700', color: '#FF4500' },
  reorderBtn: { backgroundColor: '#FF4500', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  reorderBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  addressCard: { backgroundColor: '#f9f9f9', borderRadius: 16, padding: 16 },
  addressLabel: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 4 },
  addressText: { fontSize: 13, color: '#888', marginBottom: 10 },
  addressEditBtn: { alignSelf: 'flex-start' },
  addressEditText: { color: '#FF4500', fontWeight: '600', fontSize: 13 },
  addAddressBtn: { borderWidth: 1.5, borderColor: '#FF4500', borderStyle: 'dashed', borderRadius: 16, padding: 16, alignItems: 'center' },
  addAddressText: { color: '#FF4500', fontWeight: '700', fontSize: 14 },
  settingsBox: { backgroundColor: '#f9f9f9', borderRadius: 16, marginBottom: 12 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  settingsLabel: { fontSize: 14, fontWeight: '500', color: '#333' },
  settingsArrow: { fontSize: 20, color: '#ccc' },
  logoutBtn: { backgroundColor: '#fff0ec', borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 4 },
  logoutText: { color: '#FF4500', fontWeight: '700', fontSize: 15 },
});
