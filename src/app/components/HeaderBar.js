import React, { Component } from 'react'
import { Header, Icon } from 'react-native-elements'
import { appStyle, appColor } from '../style'
import { View, Text, TouchableOpacity } from 'react-native'
class HeaderBar extends React.Component {
  render() {
    const rightComponent = this.props.rightComponent
    const navigation = this.props.navigation
    const label = this.props.label
    return (
      <View style={{ borderBottomWidth: 2, borderColor: 'black', height: "7.5%", flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <TouchableOpacity style={{ width: "15%", alignItems: 'flex-start', paddingLeft: "2.5%" }}
          onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' type="ionicons" />
        </TouchableOpacity>
        <Text style={{ width: "70%", textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{label.toUpperCase()}</Text>
        <View style={{ width: "15%", alignItems: 'flex-end', paddingRight: "2.5%" }}>
          {rightComponent}
        </View>
      </View>
    )
  }
}

export default (HeaderBar)