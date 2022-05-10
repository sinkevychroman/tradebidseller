import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native';
import {images} from '../themes';

export default class ProgressiveImage extends Component {
  render() {
    return (
      <ImageBackground
        style={this.props.style}
        imageStyle={this.props.imgStyle}
        source={images.placeHolder}>
        <Image
          style={this.props.style}
          source={{
            uri: this.props.uri,
          }}
        />
      </ImageBackground>
    );
  }
}
