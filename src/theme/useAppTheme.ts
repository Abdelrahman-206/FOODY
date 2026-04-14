import { useColorScheme } from 'react-native';

export const lightColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#6200EE',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',
};

export const darkColors = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#BB86FC',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#333333',
};

export type AppColors = typeof lightColors;

export function useAppTheme() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const colors = isDarkMode ? darkColors : lightColors;
  return { isDarkMode, colors };
}
