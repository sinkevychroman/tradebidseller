import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors, fonts, images, Strings } from '../themes';
import { moderateScale } from '../utils/ResponsiveUi'
import { ConstantUtils, FunctionHelper } from '../utils'
import { FlatList } from 'react-native-gesture-handler';

const TAG = "Toolbar";
export default class Toolbar extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    menuItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.props.menuClick(item)}
                onLongPress={() => { FunctionHelper.showToast(item.title) }}
                style={item.icon != undefined ? styles.menu_icon_view : styles.menu_text_view}>
                {item.icon != undefined ?
                    <View style={styles.notification}>
                        <Image source={item.icon} resizeMode="contain" style={styles.imgNotification} />
                    </View>
                    : <View style={{}}>
                        <Text style={{ fontSize: moderateScale(16), color: colors.app_pink }}>{item.title}</Text>
                    </View>}
            </TouchableOpacity>
        )
    }

    render() {
        const { isBack, titleStyle, menuItems, isMenu } = this.props
        return (
            <View style={[styles.toolbar, this.props.style, { justifyContent: isMenu ? "space-between" : "flex-start", }]}>
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", paddingLeft: moderateScale(16) }}>
                    {isBack &&
                        <TouchableOpacity onPress={this.props.onBack} style={[styles.back_btn, this.props.backStyle, { marginRight: moderateScale(16) }]}>
                            <Image source={this.props.imgBack == undefined ? images.back : this.props.imgBack} resizeMode="contain" style={[styles.imgback]} />
                        </TouchableOpacity>
                    }
                    <Text style={[styles.tv_username, titleStyle]}>{this.props.title}</Text>
                </View>
                {isMenu &&
                    <View>
                        <FlatList
                            data={menuItems}
                            horizontal
                            bounces={false}
                            renderItem={this.menuItem}
                            keyExtractor={item => item.id}
                            ListFooterComponent={<View style={{ width: moderateScale(8) }}></View>} />
                    </View>}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        width: "100%",
        height: moderateScale(60),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.off_white_background
    },
    menu_icon_view: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(40)
    },
    menu_text_view: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: moderateScale(8),
        paddingRight: moderateScale(8)
    },
    profile: {
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: moderateScale(18),
    },
    imgProfile: {
        height: moderateScale(35),
        width: moderateScale(35),
    },
    back_btn: {
        height: moderateScale(20),
        width: moderateScale(20),
    },
    imgback: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor:'#380e7e',
    },
    notification: {
        height: moderateScale(20),
        width: moderateScale(20),
    },
    imgNotification: {
        height: moderateScale(20),
        width: moderateScale(20),
        tintColor:'#380e7e',
    },
    tv_username: {
        fontSize: moderateScale(22),
        color: colors.font_header,
        fontWeight: "700",
        fontFamily: fonts.Montserrat_Bold
    }
})