import {StyleSheet, Dimensions} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  primary: '#23D690',
  secondary: 'rgba(46, 25, 62, 0.7)',
  tertiary: '#5DA6A7',
  greenButton: '#23D690',
  purpleButton: '#2e193e',
  purpleTransparent: 'rgba(46, 25, 62, 0.7)',
  disabledButton: '#ABB0B8',
  border: '#DDDDDD',
  text: '#262626',
  whiteBackground: '#e6e9ec',
  transparentWhite80: 'rgba(255, 255, 255, 0.8)',
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin',
};

const baseStyles = {
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: fonts.lg,
    fontFamily: fonts.primary,
    fontWeight: 'bold',
  },
  section: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl,
  },
  buttonYes: {
    backgroundColor: colors.greenButton,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({...baseStyles, ...overrides});
}
