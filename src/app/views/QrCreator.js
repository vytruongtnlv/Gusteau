import React, { Component } from 'react';
import { View, Text, ToastAndroid, PermissionsAndroid } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Button from '../components/Button';
import RNFS from "react-native-fs"
const file_path = RNFS.CachesDirectoryPath
import CameraRoll from "@react-native-community/cameraroll";
import { otherInput, updateData } from '../actions';
import { connect } from 'react-redux';
import { Input, Icon } from 'react-native-elements';
class QrCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: true,
      imageSaved: false,
      text: '',
      qrcodeData: "",
      qrcode: "",
      created: false,
    };
    this.svg = "";
  }

  componentDidMount() {
    this.props.otherInput({ field: 'text', value: "" })
    this.requestReadPermission()
    this.requestWritePermission()
  }

  async requestReadPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Read File Permission',
          message:
            'App needs access to your storage' +
            'so you can read QR code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read file');
      } else {
        console.log('Read File permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async requestWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write File Permission',
          message:
            'App needs access to your storage ' +
            'so you can store QR Code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write file');
      } else {
        console.log('Write File permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getDataURL() {
    this.svg.toDataURL((data) => {
      this.setState({ qrcode: data })
    })
  }

  saveQrToDisk() {
    const name = "qrimg";
    this.svg.toDataURL((data) => {
      RNFS.writeFile(`${file_path}/${name}.png`, data, 'base64')
        .then((success) => {
          this.setState({
            created: false
          })
          this.props.otherInput({ field: 'text', value: "" })
          return CameraRoll.saveToCameraRoll(`${file_path}/${name}.png`, 'photo')
        })
        .then(() => {
          this.setState({ busy: false, imageSaved: true })
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }

  createNewQRCode() {
    this.setState({
      created: true
    })
    this.checkExist()
  }



  async acceptToCreate() {
    const { cost } = this.props.navigation.state.params
    await this.getDataURL();
    const value = {
      tel: this.state.text,
      point: 0,
    }
    const item = {
      key: "members",
      value: value
    }
    this.props.updateData(item)
    this.saveQrToDisk()
    this.props.navigation.navigate('MemberView', { idMember: this.props.idItem, member: value, cost: cost })
  }

  checkExist(check) {
    //check == cmd create

    const list = this.props.memberList
    const arr = Object.keys(list)
    const length = arr.length
    let id = ""
    if (length > 0) {
      for (var i = 0; i < length; i++) {
        id = arr[i];
        if (list[id]["tel"] == this.state.text) {
          alert("Đã tồn tại!")
          return;
        }
      }
      if (list[id]["tel"] != this.state.text && check) {
        this.acceptToCreate();
      }
    } else if (!Object.keys(list)[0] && check) {
      this.acceptToCreate();
    }
  }

  render() {
    return (
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', height: "100%", width: "100%" }}>
        <Input
          keyboardType="phone-pad"
          errorMessage={this.state.text == "" ? "Không được bỏ trống" : ""}
          placeholder="Số điện thoại"
          onChangeText={text => this.setState({ text: text })}
        />
        <View pointerEvents={this.state.text != "" ? "auto" : "none"} style={{ width: "100%", marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Tạo mã QR"
            icon={<Icon name="add" type="ionicons" />}
            onPress={() => this.createNewQRCode()} />

        </View>
        {this.state.created && this.state.text != "" &&
          <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <QRCode
              value={this.state.text != "" ? this.state.text : "Lotteria"}
              size={200}
              backgroundColor="white"
              getRef={(c) => (this.svg = c)}
            />
            <View style={{ marginTop: 10 }}>
              <Button
                title="Xác nhận"
                icon={<Icon name="check" type="font-awesome" />}
                onPress={() => this.checkExist(true)} />
            </View>
          </View>}


      </View>

    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.other.text,
    idItem: state.other.idItem,
    memberList: state.members.members,
  }
}

export default connect(mapStateToProps, { otherInput, updateData })(QrCreator)
