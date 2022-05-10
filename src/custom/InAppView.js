import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert, FlatList, } from 'react-native';
import { colors, images, strings, fonts } from '../themes';
import { moderateScale } from '../utils/ResponsiveUi';
import FunctionHelper from '../utils/FunctionHelper';
import { ConstantUtils } from '../utils';

const TAG = 'InAppView';
export default class InAppView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        const { visible, data, message } = this.props;
        return (
            <View
                style={{
                    width: visible ? '100%' : 0,
                    height: visible ? '100%' : 0,
                    backgroundColor: colors.color_half_black,
                    position: 'absolute',
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { }}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({ dropDownVisible: true });
                        }}
                        style={{
                            width: '90%',
                            backgroundColor: colors.colorWhite,
                            borderRadius: moderateScale(8),
                            overflow: 'hidden',
                        }}>
                        <View style={{ width: "100%" }}>
                            <View style={{ paddingLeft: moderateScale(16), paddingRight: moderateScale(16), paddingTop: moderateScale(16), paddingBottom: moderateScale(16), flexDirection: "row", justifyContent: "center" }}>
                                <Text style={{ color: colors.font_header, fontFamily: fonts.Montserrat_SemiBold, fontSize: moderateScale(20) }}>{"$"}</Text>
                                <Text style={{ color: colors.app_pink, fontFamily: fonts.Montserrat_SemiBold, fontSize: moderateScale(20) }}>{"12.99"}</Text>
                                <Text style={{ color: colors.font_header, fontFamily: fonts.Montserrat_SemiBold, fontSize: moderateScale(20) }}>{" / Month"}</Text>
                            </View>
                            <View style={{ paddingLeft: moderateScale(16), paddingRight: moderateScale(16) }}>
                                <Text style={{ color: colors.fontList, fontFamily: fonts.Montserrat_SemiBold, textAlign: "center", lineHeight: moderateScale(24), fontSize: moderateScale(13) }}>{"By purchasing membership plan, you will access to the chat feature."}</Text>
                            </View>
                            <View style={{ paddingLeft: moderateScale(16), paddingRight: moderateScale(16) }}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.itemClick(ConstantUtils.REDIRECT)} style={styles.submit_btn}>
                                    <Text style={{ color: colors.colorWhite, fontFamily: fonts.Montserrat_SemiBold, fontSize: moderateScale(18) }}>{"Purchase"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    submit_btn: {
        width: "100%",
        height: moderateScale(50),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.app_purpal,
        borderRadius: moderateScale(30),
        marginTop: moderateScale(16),
        marginBottom: moderateScale(16)
    }
});
