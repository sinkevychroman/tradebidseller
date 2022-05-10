import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert, FlatList, } from 'react-native';
import { colors, images, strings, fonts } from '../themes';
import { moderateScale } from '../utils/ResponsiveUi';
import FunctionHelper from '../utils/FunctionHelper';

const TAG = 'CustomeModelDropDown';
export default class CustomeModelDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    eventItem(item, index) {
        let value = item[this.props.valueOfKey];
        let display = ""
        if (this.props.displayKey == undefined) {
            display = item[this.props.valueOfKey];
        } else {
            display = item[this.props.displayKey];
        }
        return (
            <TouchableOpacity
                onPress={() => this.props.itemClick(index)}
                style={{
                    width: '100%',
                    height: moderateScale(45),
                    justifyContent: 'center',
                    backgroundColor:
                        this.props.selectItem == value ? colors.off_white_background : colors.white,
                }}>
                <Text
                    style={{
                        textTransform: 'capitalize',
                        color:
                            this.props.selectItem == value ? colors.colorBlack : colors.fontPrimary,
                        fontSize:
                            this.props.selectItem == value
                                ? moderateScale(18)
                                : moderateScale(16),
                        fontFamily:
                            this.props.selectItem == value
                                ? fonts.Montserrat_Bold
                                : fonts.Montserrat_SemiBold,
                        paddingLeft: moderateScale(16),
                    }}>
                    {display}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { visible, selectItem, data, modelRenderItem } = this.props;
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
                    onPress={() => this.props.itemClick(-1)}
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
                            height: data.length < 10 ? data.length * moderateScale(45) : '50%',
                            backgroundColor: colors.colorWhite,
                            borderRadius: moderateScale(8),
                            overflow: 'hidden',
                        }}>
                        <View>
                            <FlatList
                                style={{ backgroundColor: colors.colorWhite }}
                                showsVerticalScrollIndicator={false}
                                data={data}
                                extraData={data}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                    modelRenderItem == undefined
                                        ? this.eventItem(item, index)
                                        : modelRenderItem(item, index)
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
