import { TextInput, View, TouchableOpacity, Image, Text } from "react-native";
import React, { Component } from "react";
import { moderateScale } from "../utils/ResponsiveUi";
import { images, fonts, colors } from "../themes";

const ButtonDropdown = React.forwardRef((props, ref) => {
  return (
    <View
      style={{
        height: props.height,
        width: props.width,
        flexDirection: "row",
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        position: props.position ? 'absolute' : 'relative',
      }}
    >
      <TouchableOpacity
        style={{width: '100%', height: '100%',paddingLeft:moderateScale(5)}}
        onPress={() => props.onclick()}>
      <View
        style={{
          height: props.height - moderateScale(10),
          width: '91%',
          flexDirection: 'row',
          alignSelf: "center",
          borderBottomColor: colors.colorBlack,
          borderBottomWidth: moderateScale(1)
        }}
       >
       <View style={{width:"90%",height: "100%", justifyContent: 'center'}}>
         <Text style={{fontSize: moderateScale(14), fontFamily: fonts.Poppins_Regular}}>{props.title}</Text>
        </View>
        <View style={{width:"10%",height: "100%",justifyContent: 'center', alignItems: 'center', opacity: props.isNotEdit ? 0.0 : 1.0}}>
            <Image source={images.down_arrow} style={{resizeMode: 'contain', height: moderateScale(10), width: moderateScale(10)}}/>
        </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
export default ButtonDropdown;
