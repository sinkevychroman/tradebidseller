import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
import { constantUtils } from '../utils';
import fonts from './fonts';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export function normalizeImage(size) {
    const scale = SCREEN_HEIGHT / 320;
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        //alert(PixelRatio.roundToNearestPixel(newSize))
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export function getTranslateFontRegular(language) {
    if (language == constantUtils.ARABIC_CODE) {
        return fonts.TajawalRegular
    } else {
        return fonts.SourceSansPro
    }
}

export function getTranslateFontSemiBold(language) {
    if (language == constantUtils.ARABIC_CODE) {
        return fonts.TajawalMedium
    } else {
        return fonts.SourceSansProSemiBold
    }
}

export function getTranslateFontBold(language) {
    if (language == constantUtils.ARABIC_CODE) {
        return fonts.TajawalBold
    } else {
        return fonts.SourceSansProBold
    }
}
