import React, { Component } from 'react';
import { View, Text, Alert, ToastAndroid } from 'react-native';
import { updateData } from '../actions';
import PaymentComponent from '../components/PaymentComponent';
import { connect } from 'react-redux';
import { ButtonGroup } from 'react-native-elements';
import { appColor } from '../style';
import HeaderBar from '../components/HeaderBar';

const btnSave = () => <Text>Tích điểm</Text>
const btnUse = () => <Text>Sử dụng điểm</Text>

class MemberView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: 0,
      selectedIndex: 0,
      discount: 0
    };
    const { navigation } = this.props
    const { idMember, member, cost } = navigation.state.params
    this.member = member;
    this.idMember = idMember;
    this.cost = cost;
  }

  componentDidMount() {
    this.setState({ point: this.member["point"] })
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


  updatePoint = (point, reset) => {
    if (this.member) {
      const updateValue = {
        key: "members",
        value: {
          ...this.member,
          "point": reset ? point : this.member["point"] + point
        },
        id: this.idMember
      }
      this.setState({ point: reset ? point : this.member["point"] + point })
      this.props.updateData(updateValue)
      this.props.navigation.navigate("MemberView", {
        idMember: this.idMember,
        member: this.member,
        cost: this.cost
      })
    }
    else {
      alert('Không tìm thấy mã!')
    }
  }

  discount() {
    var discount = parseInt(this.member["point"] / 1000) * 1000
    var remain = this.member["point"] - discount
    alert(`Khách hàng được giảm ${discount}đ`)
    this.updatePoint(remain, true)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
    // switch (selectedIndex) {
    //   case 0:
    //     return this.setPoint()
    //   case 1:
    //     return this.discount();
    // }
  }

  render() {
    const buttons = [{ element: btnSave }, { element: btnUse }]
    const { selectedIndex } = this.state

    return (
      <View style={{ width: "100%", height: "100%" }}>
        <HeaderBar label="Thành viên" navigation={this.props.navigation} />
        <View>

          <Text style={{ fontSize: 16, paddingLeft: 5 }}>Số điện thoại
          <Text style={{ fontSize: 20 }}>    {this.member["tel"]}</Text></Text>
          <Text style={{ fontSize: 16, paddingLeft: 5 }}>Điểm
           <Text style={{ fontSize: 20 }}>    {this.props.memberList[this.idMember]["point"]}</Text> </Text>
          <ButtonGroup
            buttonStyle={[{ justifyContent: 'center', alignItems: 'center', backgroundColor: appColor.unfocusedColor, }]}
            onPress={this.updateIndex.bind(this)}
            selectedButtonStyle={{ backgroundColor: appColor.focusedColor, }}
            selectedIndex={selectedIndex}
            buttons={buttons} />
        </View>
        <PaymentComponent
          cost={this.cost} member={this.member}
          idMember={this.idMember} option={this.state.selectedIndex} discount={this.state.discount} />
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