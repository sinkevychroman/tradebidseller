import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale } from '../utils/ResponsiveUi';
import { images, colors } from '../themes';


/**
 * New Button Component
 * @param {*} param0 
 */
const Button = ({
  title,
  titleStyle,
  style,
  onPress,
  isRememberButton,
  isRemember,
  isFromSell,
  isEditButton,
  isVehicleCheckBox,
  iconStyle,
  isChecked
}) => {
  return(
  <TouchableOpacity
    onPress={() => onPress()}
    style={[styles.toDefaultStyle, style, isEditButton ? styles.toEditableStyle : {}, isRememberButton ? styles.toRememberStyle : {}, isFromSell ? styles.toSellStyle : {}]}>
    {isRememberButton && (
      <Image
        source={isChecked ? images.checked_box : images.unCheck}
        style={[styles.ivDefaultStyle, iconStyle, isVehicleCheckBox ? styles.ivCheckBoxStyle : {}, isChecked ? styles.ivChecked : {}]}
      />
    )}
    <Text  style={[titleStyle]}>{title}</Text>
  </TouchableOpacity>)
}

/**
 * Old Button component
 * @param {*} param0 
 * @returns 
 */
// const Button = ({
//   buttonTitle,
//   height,
//   width,
//   backgroundColor,
//   marginBottom,
//   textStyle,
//   onButtonPress,
//   borderWidth,
//   borderRadiusApply,
//   isRememberButton,
//   isRemember,
//   marginTop,
//   isFromSell,
//   isEditButton,
//   isvehicleCheckBox,
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={() => onButtonPress()}
//       style={{
//         height: height,
//         width: width,
//         borderWidth: borderWidth,
//         backgroundColor: backgroundColor,
//         borderRadius: borderRadiusApply
//           ? moderateScale(borderRadiusApply)
//           : moderateScale(13),
//         justifyContent: isFromSell ? 'flex-start' : 'center',
//         alignItems: 'center',
//         flexDirection: isRememberButton ? 'row' : 'column',
//         marginTop: marginTop ? marginTop : 0,
//         borderColor: isEditButton ? colors.colorBlue : 'transparent'
//       }}>
//       {isRememberButton && (
//         <Image
//           source={isRemember ? images.checked_box : images.unCheck}
//           style={{
//             height: moderateScale(15),
//             width: moderateScale(15),
//             resizeMode: 'contain',
//             top: isvehicleCheckBox ? moderateScale(3) : moderateScale(6),
//             tintColor: isRemember ? colors.colorBlack : colors.grayColor_check_box,
//             marginRight: moderateScale(5)
//           }}
//         />
//       )}
//       <Text style={[textStyle]}>{buttonTitle}</Text>
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({
  toDefaultStyle: {
    // borderRadius: moderateScale(13),
    alignItems: 'center',
    borderColor: 'transparent',
    justifyContent: 'center'
  },
  toEditableStyle: {
    borderColor: colors.colorBlue
  },
  toRememberStyle: {
    flexDirection: 'row'
  },
  toSellStyle: {
    justifyContent: 'flex-start'
  },
  ivDefaultStyle: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
    // top: moderateScale(6),
    tintColor: colors.grayColor_check_box,
    marginRight: moderateScale(5)
  },
  ivCheckBoxStyle: {
    top: moderateScale(0),
  },
  ivChecked: {
    tintColor: colors.colorBlack
  }
})

export default Button;


