import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, images, strings, fonts } from '../themes';
import { moderateScale } from '../utils/ResponsiveUi'
import { ConstantUtils } from '../utils';
import { FlatList } from 'react-native-gesture-handler';

const TAG = "Indicator";
export default class Indicator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        this.setIndicatorData()
    }

    setIndicatorData() {
        const { count, currentIndicate } = this.props
        let dataTemp = []
        for (let i = 1; i <= count; i++) {
            let indicator = {
                isCurrent: i == currentIndicate ? true : false,
                id: i
            }
            dataTemp.push(indicator)
        }
        console.log(TAG, "setIndicatorData", dataTemp)
        this.setState({ data: dataTemp })
    }

    renderItem = ({ item, index }) => {
        return (<View style={{ height: moderateScale(4), width: moderateScale(12), backgroundColor: item.isCurrent ? colors.app_pink : colors.app_gray }}></View>)
    }

    itemSeparator() {
        return (
            <View style={{ height: moderateScale(4), width: moderateScale(8) }}>
            </View>
        )
    }

    render() {
        const { style, count } = this.props
        const { data } = this.state
        return (
            <View style={style}>
                <FlatList
                    horizontal
                    data={data}
                    bounces={false}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.itemSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

})