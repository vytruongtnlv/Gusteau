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
    this.scanner;
  }

  onSuccess = (e) => {
    const memberList = this.props.memberList;
    let member = null;
    if (Object.keys(memberList)[0]) {
      Object.keys(memberList).map(id => {
        if (memberList[id]["tel"] == e.data) {
          _id = id
          this.props.navigation.navigate('MemberView', { idMember: id, member: memberList[id] })
          return;
        }
      })
      if (memberList[_id]["tel"] != e.data) {
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