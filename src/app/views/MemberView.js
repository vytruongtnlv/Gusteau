import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { updateData } from '../actions';
import PaymentComponent from '../components/PaymentComponent';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { ButtonGroup } from 'react-native-elements';


const btnSave = () => <Text>Tích điểm</Text>
const btnUse = () => <Text>Sử dụng điểm</Text>

class MemberView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      discount: 0
    };
    const { navigation } = this.props
    const { idMember, member, cost } = navigation.state.params
    this.member = member;
    this.idMember = idMember;
    this.cost = cost;
  }

  setPoint() {
    const point = this.cost * 0.002
    Alert.alert(
      'Tích điểm thành viên',
      `Tích ${point} L.Point cho tài khoản ${this.member["tel"]}`,
      [
        {
          text: 'Huỷ',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => this.updatePoint(point) },
      ],
      { cancelable: false },
    );
  }

  updatePoint = (point) => {
    if (this.member) {
      const updateValue = {
        key: "members",
        value: {
          ...this.member,
          "point": this.member["point"] + point
        },
        id: this.idMember
      }
      this.props.updateData(updateValue)
      alert('Tích điểm thành công cho khách hàng')
    }
    else {
      alert('Không tìm thấy mã!')
    }
  }

  discount() {
    this.setState({ discount: this.member["point"] })
    alert(`Tổng phải trả ${this.cost - this.member["point"]}`)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
    switch (selectedIndex) {
      case 0:
        return this.setPoint()
      case 1:
        return this.discount();
    }
  }

  render() {
    const buttons = [{ element: btnSave }, { element: btnUse }]
    const { selectedIndex } = this.state

    const { navigation } = this.props
    const { idMember, member, cost } = navigation.state.params
    return (
      <View>
        <View>
          <Text> Thành viên </Text>
          <Text> Số điện thoại {member["tel"]} </Text>
          <Text> Điểm {member["point"]} </Text>
          <ButtonGroup
            onPress={this.updateIndex.bind(this)}
            selectedIndex={selectedIndex}
            buttons={buttons} />
        </View>
        <PaymentComponent discount={this.state.discount} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberList: state.members.members,
  }
}

export default connect(mapStateToProps, { updateData })(MemberView)