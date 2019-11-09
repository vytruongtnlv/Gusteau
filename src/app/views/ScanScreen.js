import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { updateData } from '../actions';

class ScanScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render: false
    }
    this.scanner;
  }

  onSuccess = (e) => {
    const { cost } = this.props.navigation.state.params
    const memberList = this.props.memberList;
    let member = null;
    const arr = Object.keys(memberList)
    if (arr[0]) {
      var id = ""
      for (var i = 0; i < arr.length; i++) {
        id = arr[i];
        if (memberList[id]["tel"] == e.data) {
          this.props.navigation.navigate('MemberView', { idMember: id, member: memberList[id], cost: cost })
          return;
        }
      }
      if (memberList[id]["tel"] != e.data) {
        this.setState({ render: !this.state.render })
        alert("Mã QR không phù hợp!")
      }
    }
    else {
      alert("Chưa có dữ liệu thành viên nào!")
    }

  }

  render() {
    return (
      <QRCodeScanner
        showMarker={true}
        ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess}
        bottomContent={
          <View>
            <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.buttonTextStyle}>Quay lại</Text>
            </TouchableOpacity>
          </View>

        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

const mapStateToProps = state => {
  return {
    memberList: state.members.members,
    member: state.members.member
  }
}

export default connect(mapStateToProps, { updateData })(ScanScreen)