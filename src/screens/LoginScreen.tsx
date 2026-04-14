import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, Image, ScrollView,
} from 'react-native';
import { useAppStore } from '../store/appStore';

export function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setLoggedIn = useAppStore((s) => s.setLoggedIn);

  const handleSubmit = () => {
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (!isLogin && !name) { setError('Please enter your name.'); return; }
    setError('');
    setLoggedIn(isLogin ? email.split('@')[0] : name, email);
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍔</Text>
          </View>
          <Text style={styles.logoText}>FOODY</Text>
          <Text style={styles.logoSub}>Your favourite food, delivered fast</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, isLogin && styles.tabActive]} onPress={() => setIsLogin(true)}>
            <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, !isLogin && styles.tabActive]} onPress={() => setIsLogin(false)}>
            <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput style={styles.input} placeholder="John Smith" placeholderTextColor="#bbb" value={name} onChangeText={setName} />
            </View>
          )}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput style={styles.input} placeholder="you@email.com" placeholderTextColor="#bbb" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#bbb" secureTextEntry value={password} onChangeText={setPassword} />
          </View>

          {isLogin && (
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>{isLogin ? 'Login' : 'Create Account'}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          {/* Social */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => setLoggedIn('Guest', 'guest@foody.com')}>
              <Text style={styles.socialBtnText}>🌐  Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => setLoggedIn('Guest', 'guest@foody.com')}>
              <Text style={styles.socialBtnText}>🍎  Apple</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.guestBtn} onPress={() => setLoggedIn('Guest', 'guest@foody.com')}>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  logoArea: { alignItems: 'center', paddingTop: 70, paddingBottom: 32 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FF4500', alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#FF4500', shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 },
  logoEmoji: { fontSize: 38 },
  logoText: { fontSize: 32, fontWeight: '900', color: '#111', letterSpacing: 3 },
  logoSub: { fontSize: 13, color: '#999', marginTop: 4 },
  tabs: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderRadius: 14, padding: 4, marginBottom: 28 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tabText: { fontSize: 15, fontWeight: '600', color: '#999' },
  tabTextActive: { color: '#111' },
  form: { gap: 4 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8 },
  input: { backgroundColor: '#f9f9f9', borderRadius: 14, padding: 16, fontSize: 15, color: '#111', borderWidth: 1, borderColor: '#f0f0f0' },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 8 },
  forgotText: { color: '#FF4500', fontSize: 13, fontWeight: '600' },
  errorText: { color: '#e53e3e', fontSize: 13, textAlign: 'center', marginBottom: 8 },
  submitBtn: { backgroundColor: '#FF4500', borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 8, shadowColor: '#FF4500', shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  submitBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 },
  divider: { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText: { color: '#bbb', fontSize: 13 },
  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  socialBtn: { flex: 1, borderWidth: 1, borderColor: '#eee', borderRadius: 14, padding: 14, alignItems: 'center' },
  socialBtnText: { fontSize: 14, fontWeight: '600', color: '#333' },
  guestBtn: { alignItems: 'center', padding: 14 },
  guestText: { color: '#999', fontSize: 14, fontWeight: '500' },
});
