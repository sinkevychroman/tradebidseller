/* eslint-disable no-undef */
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../../styles/base';
import {Logger} from '../../../utils/AppLogger';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    width: 50,
  },
});

const ProgressiveImage = (props) => {
  var thumbnailAnimated = new Animated.Value(0);

  var imageAnimated = new Animated.Value(0);

  const {thumbnailSource, source, style} = props;

  const [visible, setVisible] = React.useState(false);
  const [urlImage, setUrlImage] = React.useState('');

  React.useEffect(() => {
    setUrlImage(source);
  }, [urlImage]);

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const onImageError = React.useCallback(() => {
    Logger('error image', urlImage);
    var retryCounts = 3;
    if (!visible) {
      for (var i = 0; i < retryCounts; i++) {
        Logger('retrying load image time >>>>>>>>', i);
        setVisible(true);
        setUrlImage('');
        setUrlImage(props.source);
        wait(5000);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[style, {opacity: thumbnailAnimated}]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[styles.imageOverlay, {opacity: imageAnimated}, style]}
        onLoad={onImageLoad}
        onLoadEnd={() => {
          setVisible(true);
        }}
        onError={onImageError}
      />
      {!visible && (
        <ActivityIndicator
          color={Platform.OS === 'ios' ? null : colors.primary}
          style={[styles.indicator]}
          size="large"
        />
      )}
    </View>
  );
};
export default ProgressiveImage;
