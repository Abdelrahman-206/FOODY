import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Dimensions, Image, Animated,
} from 'react-native';
import { useAppStore } from '../store/appStore';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Burgers Delivered\nTo Your Door',
    subtitle: 'The juiciest burgers in town, delivered hot and fresh in under 30 minutes.',
    image: require('../../assets/food/burger5.jpg'),
    bg: '#FF4500',
  },
  {
    id: '2',
    title: 'Crispy Chicken\nDone Right',
    subtitle: 'Golden fried perfection. Choose from our mouth-watering chicken menu.',
    image: require('../../assets/food/chicken2.jpg'),
    bg: '#222',
  },
  {
    id: '3',
    title: 'Order in Seconds,\nEat in Minutes',
    subtitle: 'Simple checkout, real-time tracking, and always on-time delivery.',
    image: require('../../assets/food/burger3.jpg'),
    bg: '#FF4500',
  },
];

export function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      setOnboarded();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bg, width }]}>
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.slideImage} />
              <View style={[styles.imageOverlay, { backgroundColor: item.bg + 'CC' }]} />
            </View>
            <View style={styles.slideContent}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
        ))}
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextBtnText}>
            {currentIndex === slides.length - 1 ? "Let's Eat! 🍔" : 'Next →'}
          </Text>
        </TouchableOpacity>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={setOnboarded}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF4500' },
  slide: { height, justifyContent: 'flex-end' },
  imageWrapper: { ...StyleSheet.absoluteFillObject },
  slideImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { ...StyleSheet.absoluteFillObject },
  slideContent: { padding: 36, paddingBottom: 60 },
  slideTitle: { fontSize: 36, fontWeight: '900', color: '#fff', lineHeight: 42, marginBottom: 16 },
  slideSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 24 },
  dotsContainer: { position: 'absolute', bottom: 180, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { width: 24, backgroundColor: '#fff' },
  footer: { position: 'absolute', bottom: 60, left: 24, right: 24, gap: 16 },
  nextBtn: { backgroundColor: '#fff', borderRadius: 18, padding: 18, alignItems: 'center' },
  nextBtnText: { color: '#FF4500', fontWeight: '800', fontSize: 17 },
  skipText: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 15, fontWeight: '600' },
});
