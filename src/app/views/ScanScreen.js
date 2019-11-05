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

  setScore = (member) => {
    const score = member["score"] + 1
    member = {
      ...member,
      "score": score
    }
    return member
  }


  onSuccess = (e) => {
    const memberList = this.props.memberList;
    let member = null;
    Object.keys(memberList).map(id => {
      if (memberList[id]["tel"] == e.data) {
        _id = id
        member = this.setScore(memberList[id])
        this.updateScore(id, member)
      }
    })
  }

  updateScore = (id, member) => {
    if (member) {
      const updateValue = {
        key: "members",
        value: member,
        id: id
      }
      this.props.updateData(updateValue)
      alert('Tích điểm thành công cho khách hàng')
    }
    else {
      alert('Không tìm thấy mã!')
    }
    this.props.navigation.goBack()
  }



  render() {
    return (
      <QRCodeScanner
        showMarker={true}
        ref={(node) => { this.scanner = node }}
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code to test.</Text>
        }
        bottomContent={
          <View>
            <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
              <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
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