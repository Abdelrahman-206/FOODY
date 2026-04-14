import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, TextInput,
} from 'react-native';
import { useCartStore } from '../store/cartStore';

const PROMO_CODES: Record<string, number> = {
  FOODY: 0.15,
  BURGER10: 0.10,
  NEWUSER: 0.20,
};

export function CartScreen() {
  const { items, incrementItem, decrementItem, clearCart, totalPrice } = useCartStore();
  const [ordered, setOrdered] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [address, setAddress] = useState('123 Main Street, Cairo');
  const [payMethod, setPayMethod] = useState<'card' | 'cash'>('card');

  const deliveryFee = 1.99;
  const subtotal = totalPrice();
  const discount = promoCode ? subtotal * PROMO_CODES[promoCode] : 0;
  const total = subtotal - discount + deliveryFee;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      setPromoError('');
      setPromoSuccess(`🎉 ${Math.round(PROMO_CODES[code] * 100)}% discount applied!`);
    } else {
      setPromoError('Invalid promo code.');
      setPromoSuccess('');
    }
  };

  if (ordered) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successSub}>Your food is being prepared with love ❤️</Text>
        <View style={styles.trackingBox}>
          <Text style={styles.trackingTitle}>Order Status</Text>
          <View style={styles.trackingSteps}>
            {['Order Confirmed ✅', 'Preparing 🍳', 'On the Way 🛵', 'Delivered 🏠'].map((step, i) => (
              <View key={step} style={styles.trackingStep}>
                <View style={[styles.trackingDot, i === 1 && styles.trackingDotActive]} />
                <Text style={[styles.trackingLabel, i === 1 && styles.trackingLabelActive]}>{step}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.trackingEta}>Estimated delivery: 25–35 min</Text>
        </View>
        <TouchableOpacity style={styles.orderBtn} onPress={() => { clearCart(); setOrdered(false); setPromoCode(''); }}>
          <Text style={styles.orderBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySub}>Browse restaurants and add some delicious food!</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Your Cart 🛒</Text>

        {/* Items */}
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemUnit}>${item.price.toFixed(2)} each</Text>
              <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementItem(item.id)}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => incrementItem(item.id)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Delivery Address */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionBoxTitle}>📍 Delivery Address</Text>
          <TextInput
            style={styles.addressInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="#bbb"
          />
        </View>

        {/* Payment Method */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionBoxTitle}>💳 Payment Method</Text>
          <View style={styles.payRow}>
            <TouchableOpacity
              style={[styles.payOption, payMethod === 'card' && styles.payOptionActive]}
              onPress={() => setPayMethod('card')}
            >
              <Text style={styles.payOptionText}>💳  Card •••4242</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payOption, payMethod === 'cash' && styles.payOptionActive]}
              onPress={() => setPayMethod('cash')}
            >
              <Text style={styles.payOptionText}>💵  Cash</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionBoxTitle}>🏷️ Promo Code</Text>
          {promoCode ? (
            <View style={styles.promoApplied}>
              <Text style={styles.promoAppliedText}>{promoSuccess}</Text>
              <TouchableOpacity onPress={() => { setPromoCode(''); setPromoSuccess(''); setPromoInput(''); }}>
                <Text style={styles.promoRemove}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.promoRow}>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter code (try FOODY)"
                placeholderTextColor="#bbb"
                value={promoInput}
                onChangeText={setPromoInput}
                autoCapitalize="characters"
              />
              <TouchableOpacity style={styles.promoBtn} onPress={applyPromo}>
                <Text style={styles.promoBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}
          {promoError ? <Text style={styles.promoError}>{promoError}</Text> : null}
        </View>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: '#22c55e' }]}>Discount ({promoCode})</Text>
              <Text style={[styles.summaryValue, { color: '#22c55e' }]}>−${discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ height: 130 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderBtn} onPress={() => setOrdered(true)}>
          <Text style={styles.orderBtnText}>Place Order • ${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#111', marginTop: 60, marginBottom: 24 },
  emptyContainer: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22 },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  cartItemImage: { width: 70, height: 70, borderRadius: 14, resizeMode: 'cover', marginRight: 12 },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 2 },
  cartItemUnit: { fontSize: 12, color: '#bbb', marginBottom: 4 },
  cartItemPrice: { fontSize: 15, fontWeight: '700', color: '#FF4500' },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  qtyValue: { fontSize: 16, fontWeight: '700', color: '#111', minWidth: 18, textAlign: 'center' },
  sectionBox: { backgroundColor: '#f9f9f9', borderRadius: 16, padding: 16, marginTop: 16 },
  sectionBoxTitle: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 12 },
  addressInput: { backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 14, color: '#111', borderWidth: 1, borderColor: '#eee' },
  payRow: { flexDirection: 'row', gap: 10 },
  payOption: { flex: 1, borderWidth: 1.5, borderColor: '#eee', borderRadius: 12, padding: 12, alignItems: 'center' },
  payOptionActive: { borderColor: '#FF4500', backgroundColor: '#fff0ec' },
  payOptionText: { fontSize: 13, fontWeight: '600', color: '#333' },
  promoRow: { flexDirection: 'row', gap: 10 },
  promoInput: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, fontSize: 14, color: '#111', borderWidth: 1, borderColor: '#eee' },
  promoBtn: { backgroundColor: '#FF4500', borderRadius: 12, paddingHorizontal: 18, justifyContent: 'center' },
  promoBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  promoApplied: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  promoAppliedText: { color: '#22c55e', fontWeight: '600', fontSize: 14 },
  promoRemove: { color: '#FF4500', fontWeight: '600', fontSize: 13 },
  promoError: { color: '#e53e3e', fontSize: 12, marginTop: 6 },
  summaryBox: { backgroundColor: '#f9f9f9', borderRadius: 16, padding: 18, marginTop: 16 },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, color: '#111', fontWeight: '500' },
  summaryTotal: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12, marginTop: 4, marginBottom: 0 },
  summaryTotalLabel: { fontSize: 16, fontWeight: '800', color: '#111' },
  summaryTotalValue: { fontSize: 16, fontWeight: '800', color: '#FF4500' },
  footer: { padding: 20, paddingBottom: 36, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  orderBtn: { backgroundColor: '#FF4500', borderRadius: 16, padding: 18, alignItems: 'center', shadowColor: '#FF4500', shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  orderBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  successContainer: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 30 },
  successEmoji: { fontSize: 72, marginBottom: 16 },
  successTitle: { fontSize: 28, fontWeight: '900', color: '#111', marginBottom: 8 },
  successSub: { fontSize: 15, color: '#999', textAlign: 'center', marginBottom: 30 },
  trackingBox: { width: '100%', backgroundColor: '#f9f9f9', borderRadius: 20, padding: 20, marginBottom: 30 },
  trackingTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 16 },
  trackingSteps: { gap: 14, marginBottom: 14 },
  trackingStep: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  trackingDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ddd' },
  trackingDotActive: { backgroundColor: '#FF4500', width: 14, height: 14, borderRadius: 7 },
  trackingLabel: { fontSize: 14, color: '#999' },
  trackingLabelActive: { color: '#FF4500', fontWeight: '700' },
  trackingEta: { fontSize: 13, color: '#888', textAlign: 'center' },
});
