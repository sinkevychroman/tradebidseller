import { TextInput, View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { moderateScale } from '../utils/ResponsiveUi';
import { images, fonts, colors } from '../themes';
let TAG = "==:== TextField : ";


const TextField = React.forwardRef((props, ref) => {
  console.log(TAG, "props", props)

  return (
    <View
      style={{
        height: props.height,
        width: props.width,
        flexDirection: 'row',
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}>
      <View
        style={{
          height: props.height - moderateScale(10),
          width: '90%',
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          borderBottomColor: colors.colorBlack,
          borderBottomWidth: moderateScale(1),
          // backgroundColor: "red"
        }}>
        {props.isPreText && (
          <TextInput
            style={{
              height: '100%',
              width: moderateScale(16),
              fontFamily: fonts.Poppins_Light,
              fontSize: moderateScale(14),
              textAlign: 'center',
              color: colors.colorBlack,
            }}
            editable={false}
            value={props.preText}
          />
        )}
        {props._multiline ?  <TextInput
          style={{
            width: props.isPassword ? '85%' : '100%',
            fontFamily: fonts.Poppins_Light,
            fontSize: moderateScale(14),
            paddingBottom: 0,
            paddingTop: 0,
            borderWidth: 0,
            color: colors.colorBlack,
            
          }}

          editable={props.availToEdit ? true : props.availToEdit}
          placeholder={props.placeHolder}
          placeholderTextColor={colors.colorGray}
          secureTextEntry={
            props.isHideShowPass
          }
          autoCorrect={false}
          onChangeText={(text) => {
            console.log(TAG, "onChangeText -> text : ", text, "props.value->", props.value)
            props.onChangeText(text)
          }}
          value={props.value}
          onSubmitEditing={props.onSubmitEditing}
          onBlur={props.onBlur}
          ref={ref}
          returnKeyType={props.returnKeyType}
          maxLength={props.maxLength}
          keyboardType={props.numberpad ? 'phone-pad' : 'default'}
          // autoCapitalize={(props.secondletterkeyboard) ? 'none' : '' }
          multiline={props._multiline ? true : false}
          blurOnSubmit={false}     
        />:
        <TextInput
          style={{
            height: '100%',
            width: props.isPassword ? '85%' : '100%',
            fontFamily: fonts.Poppins_Light,
            fontSize: moderateScale(14),
            paddingBottom: 0,
            paddingTop: 0,
            borderWidth: 0,
            color: colors.colorBlack,
            
          }}

          editable={props.availToEdit ? true : props.availToEdit}
          placeholder={props.placeHolder}
          placeholderTextColor={colors.colorGray}
          secureTextEntry={
            props.isHideShowPass
          }
          autoCorrect={false}
          onChangeText={(text) => {
            console.log(TAG, "onChangeText -> text : ", text, "props.value->", props.value)
            props.onChangeText(text)
          }}
          value={props.value}
          onSubmitEditing={props.onSubmitEditing}
          onBlur={props.onBlur}
          ref={ref}
          returnKeyType={props.returnKeyType}
          maxLength={props.maxLength}
          keyboardType={props.numberpad ? 'phone-pad' : 'default'}
          autoCapitalize={(props.secondletterkeyboard) ? 'none' : 'none' }
          multiline={props._multiline ? true : false}
        />}

    
{props.isCarNumber ? (
          <Image
            source={props.validImg}
            style={{
              height: moderateScale(18),
              width: moderateScale(18),
              top: moderateScale(5),
              right: moderateScale(5),
              resizeMode: 'contain',
              position: 'absolute',
            }}
          />
        ) : props.isCarNumber != undefined && props.isActivityIndicatorShow &&   <ActivityIndicator style={{right: moderateScale(20)}} size="small" color="#0000ff" />
      }
       {props.isPassword && <TouchableOpacity
          style={{top: moderateScale(-5)}}
          hitSlop={{
            top: moderateScale(36),
            bottom: moderateScale(36),
            left: moderateScale(36),
            right: moderateScale(36),
          }}
          onPress={() => props.onPressHideShow()}>
          <Image
            source={
              props.passwordStatus ?images.pass_hide:images.pass_show 
            }
            style={{
              height: moderateScale(20),
              width: moderateScale(20),
              top: moderateScale(7),
              left: moderateScale(32),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity> }
      </View>
    </View>
  );
});
export default TextField;
